import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Insecview</title>
      </Head>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='text-white font-bold font-serif text-xl underline underline-offset-2'>
          About Insecview
        </h1>
        <p className='text-white mt-2'>
          <strong>Insecview</strong> is a simple and powerful tool that allows you to view public Instagram profiles, stories, highlights, and more—just by entering a username. Whether you&apos;re curious about someone&apos;s recent updates or just want to browse publicly available content anonymously, Insecview offers a fast and seamless experience.
        </p>

        <h2 className='text-white font-bold font-serif text-xl underline underline-offset-2 mt-6'>
          What We Offer
        </h2>
        <p className='text-white mt-2'>
          - View public Instagram profiles without logging in<br />
          - Access and browse Instagram stories and highlights anonymously<br />
          - Easy-to-use interface—just enter a username and explore
        </p>

        <h2 className='text-white font-bold font-serif text-xl underline underline-offset-2 mt-6'>
          Our Mission
        </h2>
        <p className='text-white mt-2'>
          Our mission is to make Instagram content exploration more accessible by simplifying how you view public profiles and stories—privately, quickly, and without hassle.
        </p>

        <h2 className='text-white font-bold font-serif text-xl underline underline-offset-2 mt-6'>
          Disclaimer
        </h2>
        <p className='text-white mt-2'>
          Insecview does not host any Instagram content and only provides access to publicly available data. We are not affiliated with Instagram or Meta Platforms Inc.
        </p>
      </div>
    </>
  );
};

export default About;
