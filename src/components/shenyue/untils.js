export default {
    CurrenttimetovideoTime: (currenttime) => {
        return `${Math.floor(currenttime / 60) < 10 ? '0' + Math.floor(currenttime / 60) : Math.floor(currenttime / 60)}:${Math.floor(currenttime % 60) < 10 ? '0' + Math.floor(currenttime % 60) : Math.floor(currenttime % 60)}`
    },
}