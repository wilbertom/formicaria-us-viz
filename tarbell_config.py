# -*- coding: utf-8 -*-

"""
Tarbell project configuration
"""

# Short project name
NAME = "formicaria-us-viz"

# Descriptive title of project
TITLE = "A visualization of data about ants in the USA"

# Exclude these files from publication
EXCLUDES = ["*.md", "requirements.txt"]

# Create JSON data at ./data.json, disabled by default
# CREATE_JSON = True

# Google spreadsheet key
# SPREADSHEET_KEY = "None"

# Spreadsheet cache lifetime in seconds. (Default: 4)
# SPREADSHEET_CACHE_TTL = 4

# Get context from a local file or URL. This file can be a CSV or Excel
# spreadsheet file. Relative, absolute, and remote (http/https) paths can be
# used.
# CONTEXT_SOURCE_FILE = ""

# S3 bucket configuration
#S3_BUCKETS = {
    # Provide target -> s3 url pairs, such as:
    #     "mytarget": "mys3url.bucket.url/some/path"
    # then use tarbell publish mytarget to publish to it
#}

# Default template variables
DEFAULT_CONTEXT = {
    'data': [   {   'column1': u'row1, column1',
                    'column2': u'row1, column2'},
                {   'column1': u'row2, column1',
                    'column2': u'row2, column2'}],
    'headline': u'Test headline',
    'keyed_data': {   'key1': {   'column1': u'key1, column1',
                                  'column2': u'key1, column2',
                                  'key': u'key1'},
                      'key2': {   'column1': u'key2, column1',
                                  'column2': u'key2, column2',
                                  'key': u'key2'}},
    'name': 'formicaria-us-viz',
    'title': 'Formicaria US'
}
