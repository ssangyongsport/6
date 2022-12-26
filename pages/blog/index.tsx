import { InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import ArticleCard from 'components/ArticleCard';
import AutofitGrid from 'components/AutofitGrid';
import Page from 'components/Page';
import { media } from 'utils/media';
import { getAllPosts } from 'utils/postsFetcher';

export default function Blog({posts}){
    return <main>
        {posts.map(post => {
            //extract slug and frontmatter
            const {slug, frontmatter} = post
            //extract frontmatter properties
            const {title, author, category, date, bannerImage, tags} = frontmatter

            //JSX for individual blog listing
            return <article key={title}>
                <Link href={`/posts/${slug}`}>
                    <h1>{title}</h1>
                </Link>
                <h3>{author}</h3>
                <h3>{date}</h3>
            </article>
        })}
    </main>
}


//Generating the Static Props for the Blog Page
export async function getStaticProps(){
    // get list of files from the posts folder
    const files = fs.readdirSync('posts');

    // get frontmatter & slug from each post
    const posts = files.map((fileName) => {
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
        const { data: frontmatter } = matter(readFile);

        return {
          slug,
          frontmatter,
        };
    });

    // Return the pages static props
    return {
        props: {
          posts,
        },
    };
}
