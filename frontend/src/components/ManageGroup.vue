<template>
    <b-container fluid class="text-left p-3">
        <b-row>
            <b-col>
                <h2> Z01-24a </h2>
                <h5> INZ003854L </h5>
                <h5> Projektowanie sys. informat. </h5>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <GroupDetailsCard title="Adam Nowak">
                    <div>
                        Prowadzi kurs w terminach:
                    </div>
                </GroupDetailsCard>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <b-btn variant="primary" size="sm" class="wider-btn"> Dodaj prowadzącego </b-btn>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col>
                <GroupDetailsCard title="Środa TP 13:15">
                    <div>
                        Budynek <b> B4 </b>
                    </div>
                </GroupDetailsCard>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <b-btn variant="primary" size="sm" class="wider-btn"> Dodaj termin </b-btn>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import GroupDetailsCard from "./GroupDetailsCard";
    export default {
        name: "ManageGroup",
        components: {GroupDetailsCard}
    }
</script>

<style scoped>
    .wider-btn {
        width: 175px
    }
</style>
