export default function ExplanationSection() {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-xs md:max-w-4xl">
      <div className="border rounded-lg">
        <div className="px-4 py-2">
          <h3 className="text-lg font-medium">Why Firebase?</h3>
          <div className="pt-4">
            <p>
              {`I personally fell in love with Firebase and have been using it for
              around 4 years. I like the NoSQL db, I like the GCP environment and
              feel comfortable in it. However, there's lots of other options and I
              may port this library to support those other platforms in the
              future.`}
            </p>
            <br />
            <p>
              {`It doesn't mean it's the best for everyone, but if you want to
              prototype fast, Firebase is the way to go IMO.`}
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="px-4 py-2">
          <h3 className="text-lg font-medium">Why Stripe?</h3>
          <div className="pt-4">
            <p>
              {`It's the bog-standard payment processor when it comes to building
              SaaS apps. However I do understand there are some great alternatives
              on the market. In the future I may port this repo to support other
              processors as well!`}
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="px-4 py-2">
          <h3 className="text-lg font-medium">Why Mixpanel?</h3>
          <div className="pt-4">
            <p>
              {`Mixpanel is a great application for tracking user behavior and user
              click events. The free plan is pretty generous too and I've been
              using it for years.`}
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="px-4 py-2">
          <h3 className="text-lg font-medium">Why DaisyUI?</h3>
          <div className="pt-4">
            <p>
              {`I actually just started picking up DaisyUI, it's pretty cool and I
              like a lot of the default styles so I said eff it, let's start
              building with it.`}
            </p>
            <br />
            <p>
              Swapping out component libraries is pretty easy though, and I may
              even build out alternative repos using things like NextUI or{" "}
              {"<pick-your-component-library-poison-here>"}
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="px-4 py-2">
          <h3 className="text-lg font-medium">Why should I use this?</h3>
          <div className="pt-4">
            <p>
              {`If you don't like building apps with NextJS and Firebase, you
              probably shouldn't.`}
            </p>
            <br />
            <p>
              {`I'm really just solving my own problem here, but if you're like me
              and love NextJS, and you love Firebase, and you want to spin up apps
              faster... then this is for you.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
