"use client";

import Script from "next/script";

declare global {
  interface Window {
    CozeWebSDK: any;
  }
}

export default function CozeChat() {
  return (
    <>
      <Script
        src="https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          new window.CozeWebSDK.WebChatClient({
            config: {
              bot_id: "7524540849393631240",
            },
            componentProps: {
              title: "Coze",
            },
            auth: {
              type: "token",
              token: "pat_t2RNlixcht0d8M8CI3neNbUSWZEJ9bFAfVBknMpWQC0Uvk8PjutMw0epCr2kytj5",
              onRefreshToken: function () {
                return "pat_t2RNlixcht0d8M8CI3neNbUSWZEJ9bFAfVBknMpWQC0Uvk8PjutMw0epCr2kytj5";
              },
            },
          });
        }}
      />
    </>
  );
}