

/**
 * تحويل أي خطأ من API إلى رسالة واضحة للمستخدم
 * @param {Object} error - الخطأ اللي جه من Axios أو fetch
 * @returns {Object} - { message: string, status: number|null }
 */
export function handleApiError(error) {
  if (error.response) {
    // الخطأ جا من السيرفر
    return {
      message: error.response.data.status_message || "Server returned an error",
      status: error.response.status,
    };
  } else if (error.request) {
    // السيرفر ما ردش بحاجة
    return { message: "No response from server", status: null };
  } else {
    // خطأ تاني غير Axios
    return { message: error.message || "Unknown error occurred", status: null };
  }
}