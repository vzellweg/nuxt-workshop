/**
 * Simple date formatting composable
 * Prevents hydration mismatches by using consistent UTC formatting
 */
export const useDateFormat = () => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return { formatDate };
};
