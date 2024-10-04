import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { BackHandler, ToastAndroid, View } from "react-native";

export default function Application() {
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const isFocused = useIsFocused(); // Kiểm tra xem trang chủ có đang được focus không
  useEffect(() => {
    // Nếu trang chủ không được focus, không cần thêm sự kiện quay lại
    if (!isFocused) return;

    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp(); // Thoát ứng dụng nếu bấm lần thứ 2
      } else {
        setBackPressedOnce(true); // Cập nhật trạng thái là đã bấm lần đầu
        ToastAndroid.show(
          "Bấm quay về lần nữa để thoát ứng dụng",
          ToastAndroid.SHORT
        ); // Hiện toast

        setTimeout(() => {
          setBackPressedOnce(false); // Reset trạng thái sau 2 giây
        }, 2000);
      }
      return true; // Chặn hành động quay về mặc định
    };

    // Lắng nghe sự kiện nút quay lại
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Dọn dẹp sự kiện khi component bị hủy hoặc mất focus
    return () => backHandler.remove();
  }, [isFocused, backPressedOnce]);
  return <View></View>;
}
