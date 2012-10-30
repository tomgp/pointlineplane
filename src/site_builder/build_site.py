#build_site.py

from jinja2 import Template
import os
from bs4 import BeautifulSoup

def url_simple(s):
	s = s.lower()
	s = s.replace(' ', '_')
	s = s.replace('&','and')
	print s
	return s

print "SITE BUILDER. GO!"
site_root ='.'
pages_directory = 'pages'
templates_directory = 'templates'
nav_template_path = os.path.join(templates_directory,'nav.html')
page_template_path = os.path.join(templates_directory,'page.html')
live_path = 'generated'



path=os.path.join(site_root, pages_directory)

site = {}

#get all the pages and their contents into a nice structure
for root, dirs, files in os.walk(path):
	for f in files:
		if ".html" in f:
			#open the page and get the title
			full_file_path = os.path.join(root, f)
			contents = open(full_file_path, 'r').read()
			soup = BeautifulSoup(contents)
			page_title = soup.select('h1.story_title')[0].string

			section_name = root.partition(path)[2][1:] #that last bit gives use everythigng from characte 1 onwards, i.e. missing char 0 whihc will probably be '/'
			site.setdefault(section_name, {'pages':[], 'section_title':section_name})
			site[section_name]['pages'].append( {"path":url_simple(full_file_path), "page_title":page_title, "content":contents })

#build the navigation HTML and push it back in to the templae vars
navigation_template = Template(open(nav_template_path, 'r').read())
nav_html = navigation_template.render(navigation=site)

page_template = Template(open(page_template_path, 'r').read())

for section in site:
	if 'pages'in site[section]:
		for page in site[section]['pages']:
			page_html = page_template.render( content=page['content'], title=page['page_title'], links=nav_html )
			outpath = os.path.join( live_path, page['path'][2:])
			directory = os.path.split(outpath)[0]
			if not os.path.exists(directory):
				os.makedirs(directory)
			print outpath
			f = open(outpath, 'w')
			f.write(page_html);