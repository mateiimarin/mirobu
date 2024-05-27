import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const isCampaignHandleValid = async (campaignHandle) => {
    const { $db } = useNuxtApp();
    const campaignRef = doc($db, "campaigns", campaignHandle);
    const campaign = await getDoc(campaignRef);

    if (campaign.exists()) return false;

    return true;

}

export const createCampaign = async (job) => {
    return new Promise(async (resolve, reject) => {
        const { $db } = useNuxtApp();
        const authUser = useAuthUser();
        console.log(job)

        var campaignHandle = (authUser.value.data.name + ' ' + Math.floor(Math.random() * (9999 - 1000) + 1000).toString()).toLowerCase().replace(/ /g, '-');
        var isHandleValid = await isCampaignHandleValid(campaignHandle);

        while(!isHandleValid) {
            campaignHandle = (authUser.value.data.name + ' ' + Math.floor(Math.random() * (9999 - 1000) + 1000).toString()).toLowerCase().replace(/ /g, '-');
            isHandleValid = await isCampaignHandleValid(campaignHandle);
        }

        await setDoc(doc($db, "campaigns", campaignHandle), {
            name: job.name,
            description: job.description,
            website: job.website,
            salary: job.salary,
            location: job.location,
            requirements: job.requirements,
            publisher: authUser.value.uid,
            applications: 0,
            scores: 0,
        });
        const authUserRef = doc($db, "users", authUser.value.uid)
        await updateDoc(authUserRef, {
            campaigns: arrayUnion({
                id: campaignHandle,
                name: job.name,
            })
        });

        authUser.value.data.campaigns.push({
            id: campaignHandle,
            name: job.name,
        })

        resolve(campaignHandle);

    })

}


export const getCampaign = async (campaignHandle) => {
    return new Promise( async (resolve) => {

        const { $db, $storage } = useNuxtApp();
        const campaign = {
            data: null,
            publisher: {
                data: null,
                logo: ''
            },
        }
        const campaignRef = await getDoc(doc($db, "campaigns", campaignHandle));
        campaign.data = campaignRef.data();
        
        const publisherRef = await getDoc(doc($db, "users", campaign.data.publisher));
        campaign.publisher.data = publisherRef.data();

        const url = await getDownloadURL(storageRef($storage, `users/${campaign.publisher.data.name}`))
        campaign.publisher.logo = url;

        resolve(campaign);
    })
}


