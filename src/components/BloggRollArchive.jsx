import React from "react"
import { Stack, Box, Grid, Text, FormField,Form,TextInput } from "grommet"
import { FormSearch } from 'grommet-icons';

import PropTypes from "prop-types"
import { graphql, StaticQuery } from "gatsby"

import BlogRoll from "./BlogRoll"

import BlogRollItem from "./BlogRollItem"

const BlogRollGrid = ({ posts }) => {
    return(
        <>
          {(posts.length > 0) ? 
            <Grid columns="250px" gap="small">
              { posts &&
                  posts.map(({ node: post }) => {
                  return(
                    <BlogRollItem
                      key={post.fields.slug}
                      image={post.frontmatter.featuredimage}
                      slug={post.fields.slug}
                      compact={true}
                      {...post.frontmatter}
                    />
                  )}
                )}
            </Grid> 
          :
            <Text weight="bold">Beklager, vi fant ikke det som du lette etter</Text>}
        </>
    )
}

class BloggRollArchive extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts: this.props.posts,
            count: this.props.count
        }
    }

    updateGrid = (value) =>{
        var updatedPosts = []
        this.props.posts.map(post => {
            (post.node.frontmatter.title.toLowerCase().includes(value.toLowerCase()) ||
             post.node.frontmatter.date.toLowerCase().includes(value.toLowerCase()))
            ? updatedPosts.push(post)
            : ""
        })
        this.setState({
            posts: updatedPosts,
            value: value
        })

    }
    
    render(){
        return(
            <>
              <Form 
                onChange={event => {
                this.updateGrid(event.target.value.toString())}}
              >
                <FormField
                  name="name" 
                  label="Søk etter artikkeltittel eller -dato "
                >
                  <Box width="medium" margin={{"vertical":"small"}}>
                    <Stack anchor="top-right">
                      <TextInput placeholder="Søk her..." />
                      <FormSearch size="large" color="brand"/>
                    </Stack>
                  </Box>
                </FormField>
              </Form>

              <BlogRollGrid posts={this.state.posts} />

            </>
          )
        }
    }



BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default () => (
  <StaticQuery
    query={graphql`
    query{
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: {
            frontmatter: { templateKey: { eq: "blog-post" } }
          }
        ) {
          edges {
            node {
              excerpt(pruneLength: 300)
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                templateKey
                date(formatString: "D. MMMM YYYY", locale: "nb")
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 400, maxHeight: 300, quality: 50) {
                      ...GatsbyImageSharpFluid
                      presentationWidth
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <BloggRollArchive pageInfo={data.markdownRemark} posts={data.allMarkdownRemark.edges} count={count} />
    )}
  />
)
