# [(My personal website)](http://zaneriley.com)

**My personal website** is a static portfolio site using jade/gulp to produce pages. 

### **Getting Started**

This project uses the command line and requires `Git` and `Node` to be installed. If you need more information, check out [this guide on Git](http://git-scm.com/book/en/Getting-Started-Installing-Git) and [the Node.JS website](http://nodejs.org/) for help. 

#### Installing

- Clone this repo. `$ git clone git://github.com/zaneriley/personal.git`
- Run npm install. `$ [sudo] npm install`

#### Editing Content

All content is located within the `src` folder. 
- Open up `project-timeline-information.json` in a text editor.
- Edit the JSON data as you'd like. Be careful of the syntax if you haven't used JSON before.
- In the terminal, run `$ gulp templates`. (This takes your data and inserts it into the HTML in `app/index.html`)

#### Editing the Theme

- Open up `dev/_theme.scss` in a text editor.
- Make changes to the variables. 
- In the terminal, run `$ gulp scss`. 

### Code Tree
```
    ├─ dist // Final output. Don't edit this folder.
    │  ├─ css
    │  ├─ fonts
    │  ├─ img
    │  ├─ js
    │  └─ index.html
    │
    ├─ src
    │  ├─ jade
    │  ├─ js
    │  └─ scss
    │
    ├─ .gitignore
    ├─ .scss-lint.yml
    ├─ gulpfile.js
    ├─ package.json
    └─ README.md
```
    
### Limitations and known issues

**Gulp watch may not live-update CSS.**

Running `$ gulp`, which opens up Brower-Sync and Gulp Watch, does not seem to load css files. I originally create this while relocating, so it may just be my poor internect connection. Will look later.

### TODO

- Refractor SCSS (lol)
- Add Gulp plugin to compress and move images from `src` to `dist`.
- Add WebP versions of static images.
