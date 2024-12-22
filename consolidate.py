# consolidate.py 
# Crafted from /GitHub/hikes/generate-hikes.py

import os
import sys
import time
import glob
import re
import getopt
import frontmatter
from datetime import datetime, timezone

## main subroutine
def process_file( type, f_name, blocks ):
  with open(f_name) as f:
    tag_consolidated = False
    post = frontmatter.loads(f.read())

    # Is this file already consolidated?
    if 'consolidated' in post.keys( ):
      consolidated = post['consolidated']
    else:
      consolidated = False

    # Process only un-consolidated files
    if not consolidated:
        
      # Get the weight for testing
      weight = str(post['weight'])
      dt = datetime.strptime(weight[1:], "%Y%m%d")

      # Check if weight (with negative sign removed) is between startDate and endDate
      if (dt >= ds) and (dt <= de):
        tag_consolidated = True

        if 'lastmod' in post.keys( ):
          tstamp = str(post['lastmod'])
        elif 'publishDate' in post.keys( ):
          tstamp = str(post['publishDate'])
        else:
          tstamp = str(post['weight'][1:])  

        if 'location' in post.keys( ):
          loc = post['location']
          if re.match(r"^(.+), *(.+)$", loc):
            location = re.sub(r"^(.+), *(.+)$", r"\1, \2", loc)
          else: 
            location = loc  
        else:
          location = "Undefined"

        if type == 'micropost':
           opening = '\n{{% micropost "' + tstamp + '" "' + location + '" %}}\n'
           blocks[tstamp] = opening + post.content + "\n{{% /micropost %}}\n"

        elif type == 'post':
          if 'title' in post.keys( ):
            title = post['title']
          else:
            title = "Title is Undefined"  

          f_name_stripped = f_name[9:].replace(".md", "/")   # remove './content' and ".md"
          blocks[tstamp] = '\n{{% post "' + title + '" "' + f_name_stripped.lower( ) + '" "' + tstamp + '" "' + location + '" %}}\n'
        
        else:
          print("ERROR: Argument " + type + " to main function is not valid.\n")
          sys.exit(2)
  
        # Mark the .md file as "consolidated"
        if tag_consolidated:
          prepend_line( f_name, "consolidated: True")

# prepend_line
def prepend_line( file_name, iline ):
    """ Insert given string as a new line after the opening '---' line in our .md file """
    # define name of temporary dummy file
    dummy_file = file_name + '.bak'
    # open original file in read mode and dummy file in write mode
    with open(file_name, 'r') as read_obj, open(dummy_file, 'w') as write_obj:
        # Read lines from original file one by one and append them to the dummy file
        count = 0
        for line in read_obj:
            write_obj.write(line) 
            if count == 0:
              # Write given iline, preceeded by opening "---", to the dummy file
              write_obj.write(iline + '\n')
              count += 1

    # remove original file
    os.remove(file_name)
    # Rename dummy file as the original file
    os.rename(dummy_file, file_name)

#############################################################################
## Main ##
#############################################################################

os.environ['TZ'] = 'America/Chicago'
time.tzset( )

print('\nNumber of arguments:', len(sys.argv[1:]))
print('Argument List:', str(sys.argv[1:]), "\n")

args = sys.argv[1:]

startDate = False
endDate = False

## arg handling per https://www.tutorialspoint.com/python/python_command_line_arguments.htm
try:
  opts, args = getopt.getopt(args, 'hs:e:', ["help", "start=", "end="])
except getopt.GetoptError:
  print("consolidate --help --start <start date> --end <end date>\n")
  sys.exit(2)

for opt, arg in opts:
  if opt in ("-h", "--help"):
    print("consolidate --help --start <start date> --end <end date> \n")
    sys.exit( )
  elif opt in ("-s", "--start"):
    startDate = arg
  elif opt in ("-e", "--end"):
    endDate = arg 
  else:
    assert False, "Unhandled option"

if not (startDate and endDate):
  print("\nERROR: You must specify a START and END date in YYYYMMDD form. ")
  print("  consolidate --help --debug --start <start date> --end <end date> \n")
  sys.exit( )

# Make datestamps for the startDate and endDate
ds = datetime.strptime(startDate, "%Y%m%d")
de = datetime.strptime(endDate, "%Y%m%d")

# Make sure we have a `contents/posts/` subdir based on year and month of endDate
year = endDate[0:4]
month = endDate[4:6]
path = "./content/posts/" + year + "/" + month
try:
  os.makedirs(path)
except FileExistsError:
  pass

# Make formatted representations of startDate and endDate
s = datetime.strptime(startDate, "%Y%m%d")
formattedStart = s.strftime("%B %-d") 
e = datetime.strptime(endDate, "%Y%m%d")
formattedEnd = e.strftime("%B %-d, %Y") 
current = datetime.now( ).isoformat( )

##
## Main Loop 
##

# Create a dict of text blocks keyed by sortable tstamp (below)
blocks = {}

# Find all the /content/micorposts .md files that do NOT have a "consolidated: true" frontmatter pair
for f_name in glob.iglob('./content/microposts/' + '**/*.md', recursive=True):
  process_file('micropost', f_name, blocks)

# Find all the /content/posts .md files that do NOT have a "consolidated: true" frontmatter pair
for f_name in glob.iglob('./content/posts/' + '**/*.md', recursive=True):
  process_file('post', f_name, blocks)

# Sort the blocks[] by key (tstamp)
sorted = sorted(blocks.keys())
if len(sorted) > 0:

  # Create a new active copy of `consolidated-startDate-thru-endDate.md` to hold the consolidated posts
  with open("consolidated-startDate-thru-endDate.md", "rt") as template:
    cFile = path + "/consolidated-" + startDate + "-thru-" + endDate + ".md"
  
    with open(cFile, "wt") as conFile:
      for line in template:
        l1 = line.replace('startDate', startDate)
        l2 = l1.replace('endDate', endDate)
        l3 = l2.replace('formattedStart', formattedStart)
        l4 = l3.replace('formattedEnd', formattedEnd)
        l5 = l4.replace('now', current)
        conFile.write(l5)

      # ...and write them in chronological order to conFile
      conFile.write("\n")

      for b in sorted:
        conFile.write(blocks[b])       

