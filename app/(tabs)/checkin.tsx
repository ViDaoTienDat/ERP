import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import CheckIn from "@/components/CheckIn";
import History from "@/components/History";

export default function checkin() {
  const [numTab, setNumTab] = useState(0); // Initialize numTab as state

  // Function to handle tab press
  const handlePressTab = (index: number) => {
    setNumTab(index); // Update numTab with the pressed tab index
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "#fff" }}>
      <CustomHeader
        title="Chấm công"
        tabs={["Chấm công", "Lịch sử"]}
        func={handlePressTab}
        state={numTab}
        onchangeTab={false}
      />
      {/* Conditionally render the screen based on numTab */}
      {numTab == 0 ? <CheckIn /> : <History />}
    </View>
  );
}
// const [numTab, setNumTab] = useState(0); // Initialize numTab as state

//   // Function to handle tab press
//   const handlePressTab = (index: number) => {
//     setNumTab(index); // Update numTab with the pressed tab index
//   };

//   useEffect(() => {}, [numTab]);
//   return (
//     <Stack
//       screenOptions={{
//         header: (props) => (
//           <CustomHeader
//             title="Chấm công"
//             tabs={["Chấm công", "Lịch sử"]}
//             func={handlePressTab}
//             state={numTab}
//             onchangeTab={false}
//           />
//         ),
//       }}
//     >
//       <Stack.Screen name="CheckIn" />
//       <Stack.Screen name="History" />
//     </Stack>
//   );
