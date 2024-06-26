import Head from "next/head";

export default function Privacy({ dark }) {
  return (
    <div className={`${dark ? "dark" : ""} `}>
      <Head>
        <title>Privacy Policy - FootZone</title>
        <meta
          name="keywords"
          content="e-commerce, shopping, online shopping, Carterz"
        />
      </Head>
      <div className="bg-gray-100 min-h-screen dark:bg-slate-800">
        <header className="py-4 px-4  dark:bg-slate-900">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold dark:text-white text-black">
              Privacy Policy
            </h1>
          </div>
        </header>

        <main className="container mx-auto py-8">
          <section className="bg-white dark:bg-slate-900 dark:text-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">The Organisation</h2>
            <p>
              Welcome to FootZone! At FootZone, we value your privacy and are
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, and disclose your personal
              information when you use our services.
            </p>
          </section>
          <section className="bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-6 shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-2">
              Information We Collect
            </h2>
            <p>
              We collect various types of information, including personal
              information, when you use our website. This information may
              include your username, email address and preferences or any
              addresses (if you provide). We collect this information for the
              purpose of providing and improving our services.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-6 shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-2">
              How We Use Your Information
            </h2>
            <p>
              We use the information we collect for various purposes, including
              processing orders, communicating with you, improving our services,
              and ensuring the security of your account. We may also use your
              information for marketing purposes, but only with your consent.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
