#!/usr/bin/env python3

import sys
from insert import insert

cmd_list = """Available commands:
-insert -> insert various objects into the specified html file. What can be inserted varies between files."""

try:
    if __name__ ==  "__main__" and sys.argv[1] == "-insert":
        try:
            insert(sys.argv[2])
        except IndexError as e:
            print("No file passed")
            exit(1)

    elif __name__ ==  "__main__" and sys.argv[1] == "-help":
        print(cmd_list)

except IndexError as e:
    print("No argument present. Pass '-help' for more information.")
    exit(1)

