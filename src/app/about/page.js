import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Insecview</title>
      </Head>
      <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1 className='text-white font-bold font-serif text-xl underline underline-offset-2' >About Insecview</h1>
        <p>
          Welcome to <strong>Insecview</strong>, your trusted platform for 
          staying informed about the latest in cybersecurity and technology trends. 
          Our mission is to deliver accurate, timely, and insightful information 
          to help individuals and businesses stay ahead of potential threats and innovations.
        </p>
        <h2 className='text-white font-bold font-serif text-xl underline underline-offset-2' >Our Vision</h2>
        <p>
          To be a leading source of cybersecurity news and insights, 
          fostering a safer digital world for everyone.
        </p>
        <h2 className='text-white font-bold font-serif text-xl underline underline-offset-2' >Our Team</h2>
        <p>
          Our team consists of passionate cybersecurity professionals, 
          researchers, and writers dedicated to bringing you the most 
          relevant and impactful stories from the digital world.
        </p>
      </div>
    </>
  );
};

export default About;
