import {derived, readable, writable} from 'svelte/store';
import type {Agent} from '$lib/agent';
import type { AppBskyActorDefs } from '@atproto/api';
import type {Theme} from "$lib/types/theme";
import {defaultReactionButtons} from "$lib/defaultSettings";
import timerWorkerUrl from '$lib/workers/timer.js?url'
import {isSafariOrFirefox} from "$lib/util";

export const currentTimeline = writable<number>(Number(localStorage.getItem('currentTimeline')) || 0);

export const agent = writable<Agent>(undefined);

export const agents = writable(new Map<number, Agent>());

export const junkAgentDid = writable<string | undefined>(undefined);

export const userLists = writable(localStorage.getItem('lists')
    ? JSON.parse(localStorage.getItem('lists'))
    : []);

const defaultSettings = {
    general: {
        userLanguage: window.navigator.language,
        language: window.navigator.language,
        disableAlgorithm: false,
        repostConfirmSkip: false,
        deleteConfirmSkip: false,
        linkWarningConfirmSkip: false,
        hideWorkspaceButton: false,
        hideProfileCounts: false,
        enableBluefeed: false,
        disableHaptics: false,
        enableAppBrowser: false,
        disableChat: false,
        disableTenorAutoplay: false,
        disableAtmosphere: false,
        losslessImageUpload: false,
        requireInputAltText: false,
        useVirtual: false,
        continuousTag: false,
    },
    design: {
        skin: 'default',
        theme: 'defaut-10',
        nonoto: isSafariOrFirefox() ? true : false,
        fontTheme: 'default',
        darkmode: false,
        absoluteTime: false,
        layout: 'decks',
        postsImageLayout: 'default',
        postsLayout: 'compact',
        publishPosition: 'left',
        externalLayout: 'normal',
        reactionButtons: defaultReactionButtons,
        advancedBreak: false,
        mobilePostLayoutTop: false,
        displayHandle: true,
        reactionMode: 'tokimeki',
        leftMode: false,
        disableProfilePopup: false,
        immersiveMode: false,
        singleWidth: 'medium',
        fixedFooter: false,
        mutualDisplay: false,
        mobileNewUi: false,
        bubbleTimeline: false,
        threaded: false,
    },
    timeline: {
        hideRepost: 'all',
        hideReply: 'all',
        hideMention: 'all',
        hideQuote: false,
        simpleReply: false,
    },
    moderation: {
        contentLabels: {
            gore: 'warn',
            nsfw: 'warn',
            nudity: 'warn',
            suggestive: 'warn',
            porn: 'warn',
            sexual: 'warn',
        },
        labelers: [],
    },
    embed: {
        x: true,
        youtube: true,
        spotify: false,
        bluemotion: true,
        giphy: true,
        tenor: true,
    },
    langFilter: [],
    version: 2,
}
const storageSettings = localStorage.getItem('settings') || JSON.stringify(defaultSettings);
export const settings = writable(JSON.parse(storageSettings));

const storageRepostMutes = localStorage.getItem('repostMutes') || JSON.stringify([]);
export const repostMutes = writable<string[]>(JSON.parse(storageRepostMutes));

const storagePostMutes = localStorage.getItem('postMutes') || JSON.stringify([]);
export const postMutes = writable<string[]>(JSON.parse(storagePostMutes));

export const bookmarkModal = writable({
    open: false,
    data: undefined,
})

export const cloudBookmarkModal = writable({
    open: false,
    data: undefined,
})

export const listModal = writable({
    open: false,
    data: undefined,
})

export const officialListModal = writable({
    open: false,
    uri: '',
})

type listAddModal = {
    open: boolean,
    author: AppBskyActorDefs.ProfileViewBasic | undefined,
    did: string,
}

export const listAddModal = writable<listAddModal>({
    open: false,
    author: undefined,
    did: '',
})

export const isMobileDataConnection = writable(navigator.connection ? navigator.connection.type === 'cellular' : false);

export const isDataSaving = derived([settings, isMobileDataConnection], ([$settings, $isMobileDataConnection], set) => {
    set($settings?.general.dataSaver && $isMobileDataConnection)
}, false);

type Realtime = {
    isConnected: boolean,
    data: any,
}
export const realtime = writable<Realtime>({
    isConnected: false,
    data: {
        record: undefined,
        op: undefined,
        body: undefined,
    }
});

export const realtimeStatuses = writable([]);

type ReportModal = {
    open: boolean,
    data: {
        uri: string,
        cid: string
    } | undefined,
}

export const reportModal = writable<ReportModal>({
    open: false,
    data: {uri: '', cid: ''} || undefined,
})

export const changedFollowData = writable(undefined);

export const isColumnModalOpen = writable(false);

export const theme = writable<Theme | undefined>(undefined);

type pulseDetach = {
    uri: string,
    unDetach: boolean,
    embed: unknown,
}

export const pulseDetach = writable<pulseDetach | undefined>(undefined);

export const workerTimer = readable(new Worker(timerWorkerUrl));

export const isRealtimeListenersModalOpen = writable(false);

type LinkWarning = string | undefined;

export const linkWarning = writable<LinkWarning>(undefined);

export const intersectingIndex = writable(0);

export const pauseColumn = writable<boolean>(false);

export const bluefeedAddModal = writable({
    open: false,
    post: undefined,
    did: '',
});

const DEFAULT_LABELER_SETTINGS = [
    {
        did: 'did:plc:ar7c4by46qjdydhdevvrndac',
        labels: {
            spam: 'hide',
            impersonation: 'hide',
            scam: 'hide',
            intolerant: 'warn',
            'self-harm': 'warn',
            security: 'hide',
            misleading: 'warn',
            threat: 'hide',
            'unsafe-link': 'hide',
            illicit: 'hide',
            misinformation: 'warn',
            rumor: 'warn',
            rude: 'hide',
            extremist: 'hide',
            sensitive: 'warn',
            'engagement-farming': 'hide',
            inauthentic: 'hide',
            'sexual-figurative': 'warn'
        }
    }
];

export const labelerSettings = writable(localStorage.getItem('labelerSettings')
    ? JSON.parse(localStorage.getItem('labelerSettings'))
    : DEFAULT_LABELER_SETTINGS);

export const timelineHashtags = writable([]);

export const hashtagHistory = writable(localStorage.getItem('hashtagHistory')
    ? JSON.parse(localStorage.getItem('hashtagHistory') as string)
    : []);
