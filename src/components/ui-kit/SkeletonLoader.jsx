// src/components/ui/SkeletonLoader.jsx

const SkeletonLoader = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        animation: "skeleton-loading 1.5s infinite",
      }}
    ></div>
  );
};

export default SkeletonLoader;
