import { TypedConnect } from "models/store";
import React, { Component } from "react";

@TypedConnect(
  () => {
    return {};
  },
  () => {
    return {};
  }
)
export default class WelcomeComponent extends Component {
  render() {
    return (
      <>
        <p className="text-left">
          My name is Sean Hinds, and I’m a full stack software engineer based in
          Austin, TX. My interests span IoT, automation, bioinformatics, machine
          learning, single-page application and API development, and
          infrastructure as code. My go-to toolkit includes TypeScript, Angular,
          Node.js, C++, Python, and Linux, though I’m always eager to pick up
          new technologies.
        </p>
        <p>
          Lately, I’ve been diving into the world of agentic AI, building
          systems with LangChain and LiteLLM that push the boundaries of how
          software can reason and interact. This builds on my broad foundation
          of technical experience in the biotech industry, where I’ve written
          embedded software for scientific instrumentation, as well as
          front-end, back-end, and data processing applications. Before
          transitioning fully into software engineering, I worked as a lab
          biochemist, which gave me a deep appreciation for the challenges of
          scientific research.
        </p>
        <p>
          That mix of science and technology has shaped my passion: creating
          technical solutions that enable and accelerate scientific discovery.
        </p>
        <p>
          Outside of work, you’ll usually find me hiking with my wife and dogs,
          playing pickleball, reading, biking around Austin, or experimenting
          with homebrewed beer.
        </p>
      </>
    );
  }
}
