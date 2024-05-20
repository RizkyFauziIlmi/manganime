import { useState, useEffect } from "react";

const useInternetSpeed = () => {
  const [speed, setSpeed] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testInterval, setTestInterval] = useState(60_000);
  const [isOn, setIsOn] = useState(false);
  const [rsIndex, setRsIndex] = useState(0);

  useEffect(() => {
    if (isOn) {
      const createDummyFile = (sizeInKB: number) => {
        const sizeInBytes = sizeInKB * 1024;
        const dummyData = new Array(sizeInBytes).fill("a").join("");
        return new Blob([dummyData], { type: "application/octet-stream" });
      };

      const measureSpeed = async () => {
        setIsTesting(true);
        setError(null); // Reset error state before starting a new test

        try {
          const dummyFile = createDummyFile(1024); // Create a 1MB file
          const dummyFileUrl = URL.createObjectURL(dummyFile);

          const startTime = Date.now();
          const response = await fetch(dummyFileUrl);
          await response.blob(); // Ensure we download the whole file
          const endTime = Date.now();

          const durationInSeconds = (endTime - startTime) / 1000;
          const fileSizeInBytes = dummyFile.size;
          const speedBps = fileSizeInBytes / durationInSeconds;
          const speedKbps = (speedBps / 1024).toFixed(2);

          setSpeed(speedKbps);
          setRsIndex(getResolutionIndex(parseInt(speedKbps)));
          URL.revokeObjectURL(dummyFileUrl); // Clean up the object URL
        } catch (err) {
          setError(`Network error: ${err}`);
        } finally {
          setIsTesting(false);
        }
      };

      const getResolutionIndex = (speedKbps: number) => {
        if (speedKbps < 10000) return 0; // 360p
        if (speedKbps < 25000) return 1; // 480p
        if (speedKbps < 50000) return 2; // 720p
        return 3; // 1080p
      };

      measureSpeed();
      const intervalId = setInterval(measureSpeed, testInterval);

      return () => clearInterval(intervalId);
    }
  }, [testInterval, isOn]);

  return {
    speed,
    error,
    isTesting,
    rsIndex,
    setIsOn,
    setTestInterval,
    testInterval,
    isOn,
  };
};

export default useInternetSpeed;
