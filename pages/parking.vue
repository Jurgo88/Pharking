<template>
  <v-container>
    <v-row>
      <v-btn @click="getParkingLotsLenght()">How many do you have? {{parkingPlaces}}</v-btn>
      <v-btn @click="gimme('1')">Gimme this shit</v-btn>
    </v-row>
      Kokotko

      <v-row>
        Today is a date : {{ new Date().toLocaleString(this.localeLanguage, {weekday:'long'})}}
        Locale: {{ localeLanguage }}
      </v-row>
    <v-row>

      <v-col
      v-for="lot in parkingLots"
      :key="lot.lotId" 
      cols="12" 
      sm="6"
      md="4"
      lg="3"
      @click="reserved(lot)"
    >
      <v-card>
        <v-card-title>{{ lot.lotId }}</v-card-title>
        <NuxtLink :to="{ name: 'reservation' , params: {id: lot.lotId, lotNumber: lot.lotNumber} }" >
          <v-btn>
            Reserve
          </v-btn>
        </NuxtLink>
        <v-card-subtitle :class="{ 'text-success': lot.isAvailable, 'text-error': !lot.isAvailable }">
          {{ lot.isAvailable ? 'Available' : 'Not Available' }}
        </v-card-subtitle>
      </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getParkingLots, getParkingLotById } from '~/services/parkingService'
import { useRouter } from 'vue-router';

export default {
  
  data() {
    return {
      parkingLots: [],
      parkingPlaces: 'I am not sure',
      localeLanguage:'en-en'
    }
  },
  async mounted() {
    try {
      this.parkingLots = await getParkingLots()
      console.log("Parking lots: ", this.parkingLots);
      this.localeLanguage = Intl.DateTimeFormat().resolvedOptions().locale + '-' + Intl.DateTimeFormat().resolvedOptions().locale;
      console.log("Locale: ", this.localeLanguage);
    } catch (error) {
      console.error("Error fetching parkingLots: ", error)
    }
  },
  methods: {
    async getParkingLots() {
      try {
        this.parkingLots = await getParkingLots()
        console.log("Kokooooot");
      } catch (error) {
        console.error("Error fetching parkingLots: ", error)
      }
    },
    async getParkingLotById(id) {
      try {
        console.log("ID: ", id);
        return await getParkingLotById(id)
      } catch (error) {
        console.error("Error fetching parkingLot: ", error)
      }
    },
    async getParkingLotsLenght() {
      try {
        let parkingLots = await getParkingLots()
        this.parkingPlaces = parkingLots.length
        return parkingLots.length
      } catch (error) {
        console.error("Error fetching parkingLots: ", error)
      }  
    },
    async reserved(lot) {
      try {
        console.log("ID: ", lot.lotId);
        // let parkingLot = await getParkingLotById(lot.lotId)
        // console.log("Parking lot: ", parkingLot);
        // //  const router = this.$route;
        // console.log("Router: ", this.$route.name);
        // // navigateTo('/reservation', { lotId: lot.lotId })
        // router.push({ path: '/reservation', query: { lotId: lot.lotId } })

      } catch (error) {
        console.error("Error fetching parkingLot: ", error)
      }
    },
    async gimme(id) {
      try {
        console.log("ID: ", id);
        let parkingLot = await getParkingLotById(id)
        console.log("Parking lot: ", parkingLot);
      } catch (error) {
        console.error("Error fetching parkingLot: ", error)
      }
    }
  }
}


</script>

<style scoped>
/* Pridaj svoje CSS štýly tu */
</style>