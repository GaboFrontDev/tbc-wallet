"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const qrcodeRegionId = "html5qr-code-full-region";
let processing = false;
// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: any) => {
  let config: any = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props: any) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) {
      return;
    }
    // when component mounts
    const config = createConfig(props);
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5Qrcode(qrcodeRegionId, config);
    html5QrcodeScanner.start(
      { facingMode: "environment" },
      config,
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner
        .stop()
        .then((ignore) => {
          // QR Code scanning is stopped.
        })
        .catch((err) => {
          // Stop failed, handle it.
        });
    };
  }, [props, mounted]);

  return mounted && <div id={qrcodeRegionId} />;
};

export default function QrCodeScanner({url = "qr"}: {url?: string}) {
  const router = useRouter();

  const onNewScanResult = (decodedText: string) => {
    if (processing) {
      return;
    }
    processing = true;
    const path = new URL(decodedText).pathname
      .split("/")
      .filter((val) => val != "")[1];
    router.push(`${url}/${path}`);
  };

  return (
    <div className="w-full">
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={true}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}
