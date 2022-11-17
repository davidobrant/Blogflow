export const getTimeString = (createdAt: number) => {
    const dateString = new Date(createdAt).toLocaleString()
    const present = Date.now()
    const timeDiff = Math.abs(present - createdAt)
    if(timeDiff < (1000*60*60)) {
        return Math.ceil(timeDiff / (1000*60)) + ' min ago'
    }
    if(timeDiff < (1000*60*60*24)) {
        if (Math.ceil(timeDiff / (1000*60*60)) === 1) return '1 hour ago'
        return Math.ceil(timeDiff / (1000*60*60)) + ' hours ago'
    } 
    return dateString
}