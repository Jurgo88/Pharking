import { db } from '~/plugins/firebase'
import { collection, doc, getDoc, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'
import { ParkingLot } from '~/models/parkingLot'



const parkingCollection = collection(db, 'parkingLots')
// let allParkingLots = await getDocs(parkingCollection);
// console.log('Skuska:', allParkingLots)  // Log pre overenie


export async function getParkingLots() {
  try {
    const snapshot = await getDocs(parkingCollection)
    return snapshot.docs.map(doc => new ParkingLot({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error fetching parkingLots: ", error)
    throw error
  }
  
}

export async function getParkingLotById(id) {
  try {
    // Log pre overenie
    console.log('Collection:', await getDocs(parkingCollection)) 

    // Získaj všetky parkovacie miesta
    let allParkingLots = await getParkingLots();
    console.log('Skuska mikofronov:', allParkingLots)  // Log pre overenie

    // Prechádzaj všetky parkovacie miesta a hľadaj podľa ID
    for (let i = 0; i < allParkingLots.length; i++) {
      if (allParkingLots[i].lotId === id) {
        return allParkingLots[i];
      }
    }

    // Ak parkovacie miesto nebolo nájdené, pokús sa ho získať priamo z Firestore
    const docRef = doc(db, 'parkingLots', id.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return new ParkingLot({
        lotId: docSnap.id,
        ...docSnap.data()
      })
    } else {
      throw new Error('Parking lot not found');
    }
  } catch (error) {
    console.error("Error fetching parkingLot: ", error)
    throw error
  }
}

// Funkcia na vymazanie parkovacieho miesta
export async function deleteParkingLot(id) {
  try {
    const docRef = doc(db, 'parkingLots', id.toString()); // Odkaz na konkrétny dokument
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting parkingLot: ", error)
    throw error
  }
}

// // Funkcia na vytvorenie nového parkovacieho miesta
// export async function createParkingLot(data) {
//   try {
//     await addDoc(parkingCollection, data)
//   } catch (error) {
//     console.error("Error creating parkingLot: ", error)
//     throw error
//   }
// }

// export async function createParkingLot(data) {
//   try {
//     await addDoc(parkingCollection, data)
//   } catch (error) {
//     console.error("Error creating parkingLot: ", error)
//     throw error
//   }
// }


