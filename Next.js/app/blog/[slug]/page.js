export default function BlogPostPage({ params }) {  // we're receiving it from next js -- 435
    return (
        <main>
            <h1>Blog Post</h1>
            <p>{params.slug}</p>
        </main>
    );
}


/**
 * The params will be an object where every placeholder you had in such dynamic route would be a key and the value stored in the key will be the concrete value encoded in the URL. 
 * 
 */