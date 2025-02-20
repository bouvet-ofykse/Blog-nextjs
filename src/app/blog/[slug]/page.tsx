


export default function BlogPost({params}) {

    const blogId: number = params.blog-id;
    return (

        <h1>Blog post nummer {blogId}</h1>
    );
}