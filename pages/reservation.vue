<template>
    <div class="reservation">
        <h1>Reservation</h1>
        <form @submit="submitReservation">
            <label for="name">Lot Number:</label>
            <input type="text" id="name" v-model="this.$route.params.lotNumber" readonly >
            
            <label for="parkingLot" hidden>Parking Lot id: {{  this.$route.params.id}}</label>
            <input type="text" id="parkingLot" v-model="this.$route.params.id" readonly hidden>
            
            <label for="date">Date:</label>
            <input type="date" id="date" v-model="reservation.date" >
            
            <label for="time">Time:</label>
            <input type="time" id="time" v-model="reservation.time" >
            
            <button type="submit" @submit.prevent="submitReservation">Reserve</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reservation: {
                name: '',
                parkingLot: '',
                date: '',
                time: '',
                lotId: this.$route.params.id
            }
        };
    },
    methods: {
        submitReservation() {
            // Here you can handle the form submission and make an API call to reserve the parking lot
            // You can access the reservation data using this.reservation
            // For example:
            console.log('Reservation data:', this.reservation);
            console.log(this.reservation);
            // Make API call to reserve the parking lot
            
        }
    }
};
</script>

<style scoped>
.reservation {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

h1 {
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 10px;
}

input,
select {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    color: #ccc;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
