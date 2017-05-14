GRUNT = "./node_modules/.bin/grunt"

task :default => "build"

desc "Install dependencies with NPM"
task :install do
  sh "npm install"
end

desc "Build everything & minify"
task :build => [ "build:js", "build:css", "build:minify" ] do end

desc "Watch everything."
multitask :watch => [ "watch:js", "watch:css" ]

desc "Start a web server on port 8080"
task :serve do
  SERVER = "./node_modules/.bin/static"

  sh "#{SERVER} public -H '{\"Cache-Control\": \"no-cache, must-revalidate\"}'"
end

desc "Run tests with mocha"
task :test do
  MOCHA = "./node_modules/.bin/mocha"
  OPTS  = "--compilers coffee:coffee-script/register --ui exports"
  
  sh "#{MOCHA} #{OPTS} --reporter spec"
end

desc "Publish to GitHub Pages"
task :publish do
  sh "#{GRUNT} pages"
end

desc "Build app and make a commit with latest changes"
task :commit, [ :message ] => [ "build" ] do |t, args|
  args.with_defaults(:message => ":speech_balloon")
  
  sh "git add -A"
  sh "git commit -am \"#{args.message}\""
  sh "git push -u origin master"
end

namespace :watch do
  WATCHIFY = "./node_modules/.bin/watchify"
  WATCH    = "./node_modules/.bin/watch"

  desc "Watch the app"
  task :js do
    sh "#{WATCHIFY} -e ./src/app.coffee -o public/js/app.bundle.js -d -v"
  end

  desc "Watch the styles"
  task :css => [ "build:css" ] do
    sh "#{WATCH} \"rake build:css\" src/styles"
  end
end

namespace :build do
  BROWSERIFY = "./node_modules/.bin/browserify"
  LESS       = "./node_modules/.bin/lessc"

  desc "Build the app with Browserify"
  task :js do
    sh "#{BROWSERIFY} -e ./src/app.coffee -o public/js/app.bundle.js"
  end

  desc "Build the styles with LESS"
  task :css do
    sh "#{LESS} src/styles/sourceboard.less > public/css/app.bundle.css"
  end

  desc "Minify build for production"
  task :minify do
    sh "#{GRUNT} minify"
  end
end