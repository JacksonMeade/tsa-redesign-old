# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "TSA"
  spec.version       = "0.1.0"
  spec.authors       = ["Jackson Meade"]
  spec.email         = ["jacksonmeade@outlook.com"]

  spec.summary       = "This is the layout for the new TSA Website. It will run in the background and present the content as those who maintain the site in the future only have to change the README.md content"

  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
