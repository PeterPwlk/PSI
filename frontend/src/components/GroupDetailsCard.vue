<template>
    <div>
        <div class="m-0 header text-white" :notcollapsed="notCollapsed">
            <div class="float-left">
                {{ title }}
            </div>
            <div class="float-right">
                <b-icon icon="pencil-fill" class="mr-2"></b-icon>
                <b-icon icon="x-circle-fill" class="mr-3"></b-icon>
                <b-icon v-if="!notCollapsed" icon="caret-left-fill" class="cursor-pointer" @click="notCollapsed=!notCollapsed"></b-icon>
                <b-icon v-else icon="caret-down-fill" class="cursor-pointer" @click="notCollapsed=!notCollapsed"></b-icon>
            </div>
        </div>
        <b-collapse v-model="notCollapsed" >
            <div class="p-2 m-0 card-body">
                <slot></slot>
            </div>
        </b-collapse>
    </div>
</template>

<script>
    export default {
        name: "GroupDetailsCard",
        props: {
          title: {
              required: true,
              type: String
          }
        },
        data: () => ({
            notCollapsed: false,
        })
    }
</script>

<style scoped>
    .header {
        height: 35px;
        padding:6px 10px 6px 10px;
        background-color: var(--primary);
        border-radius: 4px;
    }
    .header[notcollapsed] {
        border-radius: 4px 4px 0 0 !important;
    }
    .cursor-pointer {
        cursor: pointer
    }

    .card-body {
        border: 1px solid var(--primary);
        border-top: none;
        border-radius: 0 0 4px 4px;
    }
</style>
