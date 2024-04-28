import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import Services from "../../Utils/Services";
import TimeTable from "../../Components/Uploadtimetable";
import Scheduler from "../Scheduler";
export default function Home() {
  const router = useRouter();
  const [issubmitted, setissubmitted] = React.useState(false);
  const checkauth = async () => {
    // await Services.clearLocalStorage();
    const token = await Services.getData("login");
    console.log(token);
    if (!token) {
      router.push("login");
    }
  };
  
  useEffect(() => {
    checkauth();
  }, []);
  return (
    <View style={{}}> 
      {/* <Text style={styles.text}>Home</Text>
      //  */}
      {!issubmitted&&
       <TimeTable setissubmitted={setissubmitted} reload={()=>{console.log('called')}}/>
      }
      {issubmitted&&
       <Scheduler/>
      }
    </View>
  );
}
// rns
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
