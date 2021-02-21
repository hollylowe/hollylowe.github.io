import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>👋</h1>
    <h1>hello, I’m Holly!</h1>
    <p>I’m a women in tech, who loves a good #ootd. I’m proud of my Software Engineering background and continuing passion for design. I’m daydreaming about my next travel adventure.</p>
    <p>UX Manager at Apple.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
