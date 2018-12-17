try {
    window.copy(`shit copy`);
    console.log(`copied!`);
} catch (error) {
    console.error(`copy error!\n`, error);
    if (window.Window && window.Window.copy) {
        window.Window.copy(`shit copy`);
    } else {
        console.error(`window.Window =\n`, window.Window);
    }
}