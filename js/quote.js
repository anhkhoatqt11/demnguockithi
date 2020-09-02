var quote = [
    "Tri thức là sức mạnh. F.Bacon",
    "Cần phải lựa chọn một cách nghiêm ngặt xem nên học gì và không nên học gì. [Lev Tolstoy]",
    "Đọc sách không bằng suy ngẫm, Học trường không hơn được trường đời. [Immanuel Kant]",
    "Nghị lực và bền bỉ có thể giúp bạn chinh phục mọi thứ",
    "Cuộc đời sẽ tươi đẹp hơn rất nhiều nếu ta có những tình bạn đúng nghĩa, luôn hết mình vì người khác.",
    "Một chữ cũng là thầy, nửa chữ cũng là thầy [Tục ngữ Việt Nam]",
    "Vấp ngã không phải là thất bại, chỉ là dừng lại cho đỡ mỏi chân thôi!",
    "Giáo dục là làm cho con người tìm thấy chính mình . [Socrates]",
    "Ước mơ không có ngày hết hạn, hãy hít thở sâu và cố gắng thêm lần nữa.",
    "Cuộc sống rất ngắn. Đừng lẵng phí nó bởi những nỗi buồn. Hãy là chính mình, luôn vui vẻ, tự do, và trở thành bất cứ gì bạn muốn.",
    "Học, học nữa, học mãi. [V.I. Lenin]",
    "Phía sau tôi không có lấy một người, sao tôi dám ngã xuống.",
    "Trường học có thể hô biến những người thắng và người bại, nhưng cuộc sống thì không. [Bill Gate]",
    "Muốn xây dựng đất nước, trước hết phải phát triển giáo dục. Muốn trị nước, phải trọng dụng người tài. [Chiếu Lập Học]"
]

function newQuote() {
    var randomNumber = Math.floor(Math.random() * (quote.length));
    document.getElementById('quotedisplay').innerHTML = quote[randomNumber];
}