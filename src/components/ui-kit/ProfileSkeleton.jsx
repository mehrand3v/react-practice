// src/components/ui/ProfileSkeleton.jsx

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <SkeletonLoader width="120px" height="120px" borderRadius="50%" />{" "}
      {/* Circular skeleton for profile picture */}
      <SkeletonLoader width="200px" height="20px" />{" "}
      {/* Skeleton for username */}
      <SkeletonLoader width="250px" height="15px" />{" "}
      {/* Skeleton for bio or description */}
      <SkeletonLoader width="220px" height="15px" />{" "}
      {/* Another skeleton for additional text */}
    </div>
  );
};

export default ProfileSkeleton;
