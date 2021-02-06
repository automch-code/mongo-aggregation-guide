// 1. ให้ group country ตาม region

db.countries.aggregate([
  {
    $group: {
      _id: "$region"
    }
  }
])

// 2. หาผลรวมของ region ตาม area ของ country ใน region นั้น

db.countries.aggregate([
  {
    $group: {
      _id: "$region",
      totalArea: {
        $sum: "$area"
      }
    }
  }
])

// 3. หา subregion

db.countries.aggregate([
  {
    $group: {
      _id: "$subregion"
    }
  }
])

// 4. หา subregion ที่มี area > 2,000,000

db.countries.aggregate([
  {
    $group: {
      _id: "$subregion",
      totalArea: {
        $sum: "$area"
      }
    }
  },
  { 
    $match: { 
      totalArea: { 
        $gt: 2000000
      } 
    } 
  }
])