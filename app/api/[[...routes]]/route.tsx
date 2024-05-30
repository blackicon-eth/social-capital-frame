/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput, Env, FrameContext, FrameResponse, TypedResponse } from "frog";
import { devtools } from "frog/dev";
import { neynar } from "frog/hubs";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { BlankInput } from "hono/types";
import * as style from "../../lib/style_components/styles";
import { readFileSync } from "fs";
import { join } from "path";
import { init, fetchQuery } from "@airstack/node";
import * as queries from "@/app/lib/constants/queries";
import * as interfaces from "@/app/lib/interfaces/interfaces";

init(process.env.AIRSTACK_KEY!);

// Load the font
const font = join(process.cwd(), "public/fonts/GothamBoldItalic.ttf");
const GothamBoldItalicBuffer = readFileSync(font);

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  hub: neynar({ apiKey: "NEYNAR_FROG_FM" }),
  verify: "silent",
  imageOptions: {
    width: 1910,
    height: 1000,
    fonts: [
      {
        data: GothamBoldItalicBuffer,
        name: "GothamBoldItalic",
      },
    ],
  },
});

// Unfortunately, importing a function with JSX elements breaks them during the compiling process
// So here it is a "library" of functions that return frames

// Returns an invalid frame
function getInvalidFrame(context: FrameContext<Env, "/", BlankInput>): TypedResponse<FrameResponse> {
  return context.res({
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/frames/invalid.png`,
    intents: [<Button action="/">Start over</Button>],
  });
}

// Returns an error frame
function getErrorFrame(context: FrameContext<Env, "/", BlankInput>): TypedResponse<FrameResponse> {
  return context.res({
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/frames/error.png`,
    intents: [<Button action="/">Start over</Button>],
  });
}

// Returns an error frame if number is not whole
function getNumberErrorFrame(context: FrameContext<Env, "/", BlankInput>): TypedResponse<FrameResponse> {
  return context.res({
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/frames/wrong_input.png`,
    intents: [
      <TextInput placeholder="followers number" />,
      <Button action="/top-users-followers">Find them!</Button>,
      <Button action="/">Start over</Button>,
    ],
  });
}

// Returns a frame with the top farcaster users
function getTopUsersPodiumFrame(
  topThreeUsers: interfaces.User[],
  context: FrameContext<Env, "/", BlankInput>
): TypedResponse<FrameResponse> {
  return context.res({
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          paddingTop: "35px",
          fontSize: 55,
          letterSpacing: -1,
          fontWeight: 1000,
          backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/frames/top_three_casters.png")`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 50,
          }}
        >
          <img
            style={{
              height: "200",
              width: "200 ",
              borderRadius: "100%",
            }}
            src={topThreeUsers[0].profileImage}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10",
            }}
          >
            <div tw={"flex flex-row rounded-3xl bg-white px-8 mt-4"}>
              {/* <img
                style={{
                  height: "100",
                  width: "100",
                  marginTop: -100,
                }}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/gold_medal.png`}
              /> */}
              {topThreeUsers[0].fnames[0]}
            </div>
            {/* <div style={{ display: "flex", flexDirection: "row", fontWeight: 100 }}>
              score:
              <div style={{ color: "green", paddingLeft: "20px" }}>120400</div>
            </div> */}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "400px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 50,
            }}
          >
            <img
              style={{
                height: "200",
                width: "200",
                borderRadius: "100%",
              }}
              src={topThreeUsers[1].profileImage}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10",
              }}
            >
              <div tw={"flex flex-row rounded-3xl bg-white px-8 mt-4"}>
                {/* <img
                  style={{
                    height: "100",
                    width: "100",
                    marginTop: -100,
                  }}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/silver_medal.png`}
                /> */}
                {topThreeUsers[1].fnames[0]}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 50,
            }}
          >
            <img
              style={{
                height: "200",
                width: "200",
                borderRadius: "100%",
              }}
              src={topThreeUsers[2].profileImage}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10",
              }}
            >
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "50",
                  marginBottom: "23",
                }}
              >
                <img
                  style={{
                    height: "100",
                    width: "100",
                    marginTop: -100,
                  }}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/bronze_medal.png`}
                />
                {topThreeUsers[2].isFarcasterPowerUser ? (
                  <img
                    style={{
                      height: "60",
                      width: "60",
                      marginTop: -120,
                    }}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/powerbadge.png`}
                  />
                ) : (
                  ""
                )}
              </div> */}
              <div tw={"flex flex-row rounded-3xl bg-white px-8 mt-4"}>
                {/* <img
                  style={{
                    height: "100",
                    width: "100",
                    marginTop: -100,
                  }}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/bronze_medal.png`}
                /> */}
                {topThreeUsers[2].fnames[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://warpcast.com/${topThreeUsers[0].fnames[0]}`}>1st</Button.Link>,
      <Button.Link href={`https://warpcast.com/${topThreeUsers[1].fnames[0]}`}>2nd</Button.Link>,
      <Button.Link href={`https://warpcast.com/${topThreeUsers[2].fnames[0]}`}>3rd</Button.Link>,
      <Button action="/">Start over</Button>,
    ],
  });
}

// Returns a frame with the top casts of today image
function getTopCastsPodiumFrame(
  topThreeCasts: interfaces.TrendingCastItem[],
  context: FrameContext<Env, "/", BlankInput>
): TypedResponse<FrameResponse> {
  const text = "casts";
  return context.res({
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "70px",
          paddingLeft: "320px",
          fontSize: 55,
          letterSpacing: -1,
          fontWeight: 1000,
          gap: 52,
          backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/frames/top_three_casts.png")`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <img
            style={{
              height: "100",
              width: "100",
              marginTop: "-15px",
            }}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/gold_medal.png`}
          />
          Casted by
          <img
            style={{
              height: "150",
              width: "150 ",
              borderRadius: "100%",
              marginTop: "-35px",
            }}
            src={topThreeCasts[0].cast.castedBy.profileImage}
          />
          {topThreeCasts[0].cast.castedBy.fnames[0]}
          {" in /"}
          {topThreeCasts[0].channel.name}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <img
            style={{
              height: "100",
              width: "100",
              marginTop: "-15px",
            }}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/silver_medal.png`}
          />
          Casted by
          <img
            style={{
              height: "150",
              width: "150 ",
              borderRadius: "100%",
              marginTop: "-35px",
            }}
            src={topThreeCasts[1].cast.castedBy.profileImage}
          />
          {topThreeCasts[1].cast.castedBy.fnames[0]}
          {" in /"}
          {topThreeCasts[1].channel.name}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <img
            style={{
              height: "100",
              width: "100",
              marginTop: "-15px",
            }}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/bronze_medal.png`}
          />
          Casted by
          <img
            style={{
              height: "150",
              width: "150 ",
              borderRadius: "100%",
              marginTop: "-35px",
            }}
            src={topThreeCasts[2].cast.castedBy.profileImage}
          />
          {topThreeCasts[2].cast.castedBy.fnames[0]}
          {" in /"}
          {topThreeCasts[2].channel.name}
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`${topThreeCasts[0].cast.url}`}>1st</Button.Link>,
      <Button.Link href={`${topThreeCasts[1].cast.url}`}>2nd</Button.Link>,
      <Button.Link href={`${topThreeCasts[2].cast.url}`}>3rd</Button.Link>,
      <Button action="/">Start over</Button>,
    ],
  });
}

// Returns a frame with your rank
function getPersonalScoreFrame(
  user: interfaces.User[],
  context: FrameContext<Env, "/", BlankInput>
): TypedResponse<FrameResponse> {
  const text = "personal score";
  return context.res({
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          paddingTop: "35px",
          fontSize: 60,
          letterSpacing: -1,
          fontWeight: 1000,
          backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/frames/your_rank.png")`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 70,
          }}
        >
          <img
            style={{
              height: "400",
              width: "400 ",
              borderRadius: "100%",
            }}
            src={user[0].profileImage}
          />
          {user[0].fnames[0]}
          <div style={{ display: "flex", flexDirection: "row", fontWeight: 100 }}>
            Your rank: {user[0].socialCapital.socialCapitalRank}
          </div>
        </div>
      </div>
    ),
    intents: [<Button action="/">Start over</Button>],
  });
}

// Returns a frame with top farcaster users under a certain amount of followers
function getTopUsersFollowersPodiumFrame(
  topThreeUsers: interfaces.User[],
  context: FrameContext<Env, "/", BlankInput>
): TypedResponse<FrameResponse> {
  return context.res({
    image: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          paddingTop: "35px",
          fontSize: 55,
          letterSpacing: -1,
          fontWeight: 1000,
          backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/frames/top_three_casters.png")`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 50,
          }}
        >
          <img
            style={{
              height: "200",
              width: "200 ",
              borderRadius: "100%",
            }}
            src={topThreeUsers[0].profileImage}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10",
            }}
          >
            <div tw={"flex flex-row rounded-3xl bg-white px-8 mt-4"}>
              <img
                style={{
                  height: "100",
                  width: "100",
                  marginTop: -100,
                }}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/gold_medal.png`}
              />
              {topThreeUsers[0].fnames[0]}
            </div>
            {/* <div style={{ display: "flex", flexDirection: "row", fontWeight: 100 }}>
              score:
              <div style={{ color: "green", paddingLeft: "20px" }}>120400</div>
            </div> */}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "400px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 50,
            }}
          >
            <img
              style={{
                height: "200",
                width: "200",
                borderRadius: "100%",
              }}
              src={topThreeUsers[1].profileImage}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10",
              }}
            >
              <div tw={"flex flex-row rounded-3xl bg-white px-8 mt-4"}>
                <img
                  style={{
                    height: "100",
                    width: "100",
                    marginTop: -100,
                  }}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/silver_medal.png`}
                />
                {topThreeUsers[1].fnames[0]}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 50,
            }}
          >
            <img
              style={{
                height: "200",
                width: "200",
                borderRadius: "100%",
              }}
              src={topThreeUsers[2].profileImage}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10",
              }}
            >
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "50",
                  marginBottom: "23",
                }}
              >
                <img
                  style={{
                    height: "100",
                    width: "100",
                    marginTop: -100,
                  }}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/bronze_medal.png`}
                />
                {topThreeUsers[2].isFarcasterPowerUser ? (
                  <img
                    style={{
                      height: "60",
                      width: "60",
                      marginTop: -120,
                    }}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/powerbadge.png`}
                  />
                ) : (
                  ""
                )}
              </div> */}
              <div tw={"flex flex-row rounded-3xl bg-white px-8 mt-4"}>
                <img
                  style={{
                    height: "100",
                    width: "100",
                    marginTop: -100,
                  }}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/bronze_medal.png`}
                />
                {topThreeUsers[2].fnames[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://warpcast.com/${topThreeUsers[0].fnames[0]}`}>1st</Button.Link>,
      <Button.Link href={`https://warpcast.com/${topThreeUsers[1].fnames[0]}`}>2nd</Button.Link>,
      <Button.Link href={`https://warpcast.com/${topThreeUsers[2].fnames[0]}`}>3rd</Button.Link>,
      <Button action="/">Start over</Button>,
    ],
  });
}

// Here starts the series of frames ------------------

// Main Frame
app.frame("/", (context) => {
  return context.res({
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/frames/front.png`,
    intents: [
      <Button value="top-users">{"Top users"}</Button>,
      <Button value="top-casts">{"Today's top casts"}</Button>,
      <Button value="top-users-followers">{"Search by followers"}</Button>,
      <Button value="personal-score">{"Your rank"}</Button>,
    ],
    action: "/worker",
  });
});

// Working the user request
app.frame("/worker", async (context) => {
  const { verified, buttonValue, frameData } = context;
  const { fid } = frameData!;

  // Validating the frame message
  //if (!verified) return getInvalidFrame(context);

  if (buttonValue === "top-users") {
    const { data, error } = await fetchQuery(queries.getTopThreeCastersQuery);

    if (error) {
      return getErrorFrame(context);
    }

    return getTopUsersPodiumFrame(data.Socials.Social, context);
  } else if (buttonValue === "top-casts") {
    const { data, error } = await fetchQuery(queries.getTodaysTrendingCastsQuery);

    if (error) {
      return getErrorFrame(context);
    }

    return getTopCastsPodiumFrame(data.TrendingCasts.TrendingCast, context);
  } else if (buttonValue === "top-users-followers") {
    return context.res({
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/frames/whole_number_instructions.png`,
      intents: [
        <TextInput placeholder="followers number" />,
        <Button action="/top-users-followers">Find them!</Button>,
        <Button action="/">Start over</Button>,
      ],
    });
  } else if (buttonValue === "personal-score") {
    console.log(fid);
    const { data, error } = await fetchQuery(queries.getYourRankQuery, { id: fid.toString() });

    if (error) {
      return getErrorFrame(context);
    }

    return getPersonalScoreFrame(data.Socials.Social, context);
  } else {
    return getErrorFrame(context);
  }
});

// Finds the top 3 users ordered by SCV with less than x followers
app.frame("/top-users-followers", async (context) => {
  const { verified, inputText } = context;

  // Validating the frame message
  //if (!verified) return getInvalidFrame(context);

  try {
    if (!inputText || !Number.isInteger(parseInt(inputText) || Number.isInteger(parseInt(inputText) < 0))) {
      return getNumberErrorFrame(context);
    }
  } catch (error) {
    return getNumberErrorFrame(context);
  }

  const { data, error } = await fetchQuery(queries.getTopThreeCastersByFollowersQuery, {
    amount: parseInt(inputText),
  });

  if (error) {
    return getErrorFrame(context);
  }

  return getTopUsersFollowersPodiumFrame(data.Socials.Social, context);
});
devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
