export default function About() {
  return (
    <div className='px-8 pb-10'>
      <h1 className='text-3xl font-bold mb-6'>About</h1>
      <p className='mb-4'>
        This is a demo project to showcase how to build a website using Next.js, Tailwind CSS, and TypeScript.
      </p>
      <p className='mb-4'>
        The website is statically generated using Next.js and uses the following APIs:
      </p>
      <ul className='list-disc pl-8 mb-4'>
        <li>
          <a href='https://jsonplaceholder.typicode.com/'>JSONPlaceholder</a> for posts
        </li>
        <li>
          <a href='https://jsonplaceholder.typicode.com/'>JSONPlaceholder</a> for comments
        </li>
        <li>
          <a href='https://jsonplaceholder.typicode.com/'>JSONPlaceholder</a> for todos
        </li>
        <li>
          <a href='https://jsonplaceholder.typicode.com/'>JSONPlaceholder</a> for users
        </li>
      </ul>
      <p className='mb-4'>
        The website uses Tailwind CSS for styling and Framer Motion for animations.
      </p>
      <p className='mb-4'>
        The website is deployed on Vercel and the source code is available on GitHub.
      </p>
    </div>
  )
}