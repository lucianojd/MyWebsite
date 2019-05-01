#!/usr/bin/env python3

#Author:    Luciano De Gianni
#Description: insert.py takes the passed html file and creates an html object
#             in the file based on the position of the <!--INSERT--> tag.

import re

def insert(html_file):

    try:
        instream = open(html_file, 'r')
    except Exception as e:
        print(e)
        exit(1)

    file_content = instream.readlines()
    instream.close()

    outstream = open(html_file, 'w')

    patt = re.compile(r"(\s*)(<!--INSERT-->)")

    for i, line in enumerate(file_content):
        outstream.write(line)

        #Find the INSERT tag.
        if patt.search(line):
            obj = create_object(file_content, i + 1)
            print_obj(outstream, obj)

    outstream.close()

def print_obj(outstream, obj):
    pass
    

def create_object(file_content, index):
    tags = get_tags(file_content[index])
    obj_lines = file_content[index:]

    for i,line in enumerate(obj_lines):
        if line in tags[1]:
            obj_lines = obj_lines[:i + 1]

    print(obj_lines)
            
    return tags


def get_tags(line):
    open_tag = re.search(r"(\s*<)(.+>\n)", line)
    close_tag = open_tag.group(1) + "/" + open_tag.group(2)
    open_tag = open_tag.group(0)

    return [open_tag, close_tag]
