// 1. หา states ที่มี populations > 10,000,000

db.zipcodes.aggregate( [
  { 
    $group: { 
      _id: "$state", 
      totalPop: { 
        $sum: "$pop" 
      } 
    } 
  },
  { 
    $match: { 
      totalPop: { 
        $gt: 10000000 
      } 
    } 
  }
] )

// 2. หา ค่าเฉลี่ย ($avg) ประชากร (pop) ของเมือง (city) ตาม state

db.zipcodes.aggregate( [
  { 
    $group: { 
      _id: { state: "$state", city: "$city" }, 
      pop: { 
        $sum: "$pop" 
      } 
    } 
  },
  { 
    $group: { 
      _id: "$_id.state",
      avgCityPop: { 
        $avg: "$pop" 
      } 
    } 
  }
] )

// 3. หาเมือง (city) ที่ใหญ่ที่สุด และ เล็กที่สุด ตาม state **ข้อยากครับ**

db.zipcodes.aggregate( [
  { $group:
     {
       _id: { state: "$state", city: "$city" },
       pop: { $sum: "$pop" }
     }
  },
  { $sort: { pop: 1 } },
  { $group:
     {
       _id : "$_id.state",
       biggestCity:  { $last: "$_id.city" },
       biggestPop:   { $last: "$pop" },
       smallestCity: { $first: "$_id.city" },
       smallestPop:  { $first: "$pop" }
     }
  },

 // $project เอาไว้เลือก field ที่เราจะนำมาแสดงครับ

 { $project:
   { _id: 0,
     state: "$_id",
     biggestCity:  { name: "$biggestCity",  pop: "$biggestPop" },
     smallestCity: { name: "$smallestCity", pop: "$smallestPop" }
   }
 }
] )