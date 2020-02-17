import React from "react"
import { Box, Heading, Grid, Text, Stack, FormField,Form,TextInput } from "grommet"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import PropTypes from "prop-types"
import { Link, graphql, StaticQuery } from "gatsby"

import BlogRoll from "../components/BlogRoll"
import WhiteBox from "../components/WhiteBox"


const SingePost = ({post}) => {
    return(
        <div>
          <Box
            elevation="xsmall"
            animation={{ type: "fadeIn", size: "medium" }}
            round="xsmall"
          >
            <Stack anchor="bottom-left">
            <Box
              height="small"
              background={{ dark: false, color: "light-2" }}
              round={{ corner: "top", size: "xsmall" }}
            >
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  style: { width: "100%" },
                }}
              />
            </Box>
            <Box
                background={{
                    "color": "neutral-1",
                    "dark": true,
                    "opacity": true,
                  }}
    
                pad={{ horizontal: 'xsmall' }}
            >
                <Text size="small">laget: {post.frontmatter.date}</Text>
            </Box>
            </Stack>
            <Box direction="column" margin="small">
              <Link to={post.fields.slug} style={{ textDecoration: "None" }}>
                <Heading
                  color="dark-1"
                  level="3"
                  size="small"
                  textAlign="start"
                  margin={{ horizontal: "small", vertical: "xsmall" }}
                >
                  {post.frontmatter.title}
                </Heading>
              </Link>
            </Box>
          </Box>
        </div>
    )   
}

const PostGrid = ({posts}) => {
    return(
        <Box>
          {(posts.length > 0) 
          ? <Grid columns="250px" gap="small">
              { posts &&
              posts.map(({ node: post }) => {
                  return(
                      <SingePost post={post} />
                  )
              })}
            </Grid>
          :"Beklager, vi fant ikke innlegget du lette etter"}
            
        </Box>
    )
}

class Arkivet extends React.Component {
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
            (post.node.frontmatter.description.toLowerCase().includes(value.toLowerCase()) ||
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
            <Box>
                <WhiteBox>
                    <Form 
                      onChange={event => {
                      this.updateGrid(event.target.value.toString())
                      }}>
                        <FormField
                            name="name" 
                            label="Søk med dato eller nøkkelord fra artikklene">
                            <TextInput placeholder="Søk her..." />
                        </FormField>
                    </Form>
                    <PostGrid posts={this.state.posts} />
                </WhiteBox>
            </Box>
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
      <Arkivet pageInfo={data.markdownRemark} posts={data.allMarkdownRemark.edges} count={count} />
    )}
  />
)
