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

// Returns a frame with the top farcaster users image
function getTopUsersPodiumFrame(
  topThreeUsers: interfaces.TopThreeUser[],
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
          fontSize: 55,
          letterSpacing: -1,
          fontWeight: 1000,
          backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/frames/top_three_casters.png")`,
          gap: "100",
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
            <div tw={"flex rounded-3xl bg-white px-8 mt-4"}>dwr</div>
            <div style={{ display: "flex", flexDirection: "row", fontWeight: 100 }}>
              score:
              <div style={{ color: "green", paddingLeft: "20px" }}>120400</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "340px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 20,
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
                <div tw={"flex rounded-3xl bg-white px-8 mt-4"}>jacob</div>
                <div style={{ display: "flex", flexDirection: "row", fontWeight: 100 }}>
                  score:
                  <div style={{ color: "green", paddingLeft: "20px" }}>120400</div>
                </div>
              </div>
            </div>
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
                <div tw={"flex rounded-3xl bg-white px-8 mt-4"}>jesse</div>
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
  topThree: string,
  context: FrameContext<Env, "/", BlankInput>
): TypedResponse<FrameResponse> {
  const text = "casts";
  return context.res({
    image: (
      <div style={style.background}>
        <p>{text}</p>
      </div>
    ),
    intents: [
      <Button.Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>1st</Button.Link>,
      <Button.Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>2nd</Button.Link>,
      <Button.Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>3rd</Button.Link>,
      <Button action="/">Start over</Button>,
    ],
  });
}

// Returns a frame with the top farcaster users image
function getPersonalScoreFrame(topThree: string, context: FrameContext<Env, "/", BlankInput>): TypedResponse<FrameResponse> {
  const text = "personal score";
  return context.res({
    image: (
      <div style={style.background}>
        <p>{text}</p>
      </div>
    ),
    intents: [
      <Button.Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>1st</Button.Link>,
      <Button.Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>2nd</Button.Link>,
      <Button.Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>3rd</Button.Link>,
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
  const { verified, buttonValue } = context;

  // Validating the frame message
  //if (!verified) return getInvalidFrame(context);

  if (buttonValue === "top-users") {
    const { data, error } = await fetchQuery(queries.getTopThreeCastersQuery);

    if (error) {
      return getErrorFrame(context);
    }

    return getTopUsersPodiumFrame(data.Socials.Social, context);
  } else if (buttonValue === "top-casts") {
    return getTopCastsPodiumFrame("", context);
  } else if (buttonValue === "top-users-followers") {
    return context.res({
      image: (
        <div style={style.background}>
          <p>top-users-followers</p>
        </div>
      ),
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
      intents: [
        <TextInput placeholder="followers number" />,
        <Button action="/top-users-followers">Find them!</Button>,
        <Button action="/">Start over</Button>,
      ],
    });
  } else if (buttonValue === "personal-score") {
    return getPersonalScoreFrame("", context);
  } else {
    return getErrorFrame(context);
  }
});

// Finds the top 3 users ordered by SCV with less than x followers
app.frame("/top-users-followers", (context) => {
  const { verified } = context;

  // Validating the frame message
  //if (!verified) return getInvalidFrame(context);

  // API call toward Airstack to find users ranked by SCV and with
  // less than x followers

  return getErrorFrame(context);
});
devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
