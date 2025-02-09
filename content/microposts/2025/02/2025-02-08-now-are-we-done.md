---
title: "Now Are We Done?"
date: 2025-02-08T14:05:47-0600
tags: template
location: "Toledo, Iowa"
coordinates: "41.98161692621105, -92.5796349564537"
draft: false
type: micropost
---
This test should return an accurate timestamp PLUS a valid "location" and "coordinates" from Drafts.

Thinking ahead, the "Publish Micropost to My Blog" script needs a couple more things:

  - The "title:" field should automatically populate from the Draft title (first line) and it should be in TitleCase.
  - Coordinates in Toledo or Tama (or other frequent stops) should get location tags without having to call the `PositionStack` API.
  