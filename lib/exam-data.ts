// ==================================================
// EXAM DATA CONFIGURATION - THPT 2027
// ==================================================
// Edit this file to update exam dates, subjects, and schedules.
// All dates should use the format "DD/M/YYYY" for display
// and ISO format "YYYY-MM-DDTHH:MM:SS" for datetime.

export const EXAM_YEAR = 2027
export const IS_PREDICT = true // Set to false when official dates are announced

export type ExamType = {
  id: string
  name: string
  shortName: string
  enabled: boolean
  sessions: ExamSession[]
}

export type ExamSession = {
  id: string
  date: string
  subject: string
  time: string
  duration?: string
  datetime: Date
  icon: string
  description?: string
  locations?: string
  enabled: boolean
}

export const allExamTypes: ExamType[] = [
  {
    id: "thptqg",
    name: "Kỳ thi tốt nghiệp THPT Quốc gia",
    shortName: "THPTQG",
    enabled: true,
    sessions: [
      {
        id: "thptqg-1",
        date: "11/6/2027",
        subject: "Ngữ văn",
        time: "07:30",
        duration: "120 phút",
        datetime: new Date("2027-06-11T07:30:00"),
        icon: "📝",
        enabled: true,
      },
      {
        id: "thptqg-2",
        date: "11/6/2027",
        subject: "Toán",
        time: "14:20",
        duration: "90 phút",
        datetime: new Date("2027-06-11T14:20:00"),
        icon: "🔢",
        enabled: true,
      },
      {
        id: "thptqg-3",
        date: "12/6/2027",
        subject: "Bài thi Tự chọn môn thứ nhất",
        time: "07:30",
        duration: "50 phút",
        datetime: new Date("2027-06-12T07:30:00"),
        icon: "1️⃣",
        enabled: true,
      },
      {
        id: "thptqg-4",
        date: "12/6/2027",
        subject: "Bài thi Tự chọn môn thứ hai",
        time: "08:35",
        duration: "50 phút",
        datetime: new Date("2027-06-12T08:35:00"),
        icon: "2️⃣",
        enabled: true,
      },
    ],
  },
]

// Checklist items for exam day preparation
export const examChecklistItems = [
  { id: "cccd", label: "CCCD/CMND (Căn cước công dân)" },
  { id: "the-du-thi", label: "Thẻ dự thi" },
  { id: "but-bi", label: "Bút bi (2 cái)" },
  { id: "but-chi-2b", label: "Bút chì 2B" },
  { id: "gom", label: "Gôm/Tẩy" },
  { id: "thuoc-ke", label: "Thước kẻ" },
  { id: "may-tinh", label: "Máy tính cầm tay (nếu được phép)" },
  { id: "nuoc-uong", label: "Nước uống" },
  { id: "dong-ho", label: "Đồng hồ đeo tay" },
  { id: "khan-giay", label: "Khăn giấy" },
]

// Daily encouragement messages (indexed by day-of-year % length)
export const dailyEncouragements = [
  "Mỗi ngày ôn tập là một bước gần hơn với thành công!",
  "Bạn đã rất giỏi rồi, hãy tiếp tục cố gắng nhé!",
  "Kỳ thi chỉ là một cột mốc, không phải đích đến cuối cùng.",
  "Nghỉ ngơi đúng lúc cũng là một phần của việc học hiệu quả.",
  "Hãy tin vào bản thân - bạn đã chuẩn bị rất tốt rồi!",
  "Mỗi môn thi là một cơ hội để thể hiện năng lực của mình.",
  "Đừng sợ thất bại, hãy sợ không dám thử thách.",
  "Hôm nay bạn đã ôn bài chưa? Bắt đầu từ 25 phút nhỏ thôi!",
  "Sức khỏe là nền tảng - ăn uống điều độ và ngủ đủ giấc nhé!",
  "Bạn không đơn độc - hàng triệu bạn học sinh cùng đang cố gắng!",
  "Kết quả của ngày mai bắt đầu từ nỗ lực của hôm nay.",
  "Hãy làm bài tập thử để làm quen với áp lực thời gian.",
  "Đọc lại những bài đã làm sai là cách học thông minh nhất.",
  "Mỗi sáng thức dậy, hãy tự nhủ: Hôm nay mình sẽ tiến bộ hơn hôm qua!",
]
