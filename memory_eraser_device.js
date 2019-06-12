const puppeteer = require('puppeteer');

// The name's not cringe enough huh?
class MemoryEraserDevice {
    constructor(profileid, email, password) {
        this.profileid = profileid;
        this.email     = email;
        this.password  = password;
    }

    async activate(start, end) {
        try {
            console.log('Activating Memory Eraser Device..');
            this.browser = await puppeteer.launch({ headless: true });
            this.page    = await this.browser.newPage();

            await this.page.goto('https://www.facebook.com', { timeout: 0 });
            await this.authenticate();

            // Become amnesia, once and for all
            for (let year = start; year <= end; year++) {
                const memories = await this.scan(year);
                await this.erase(memories);
            }
        } catch (ex) {
            console.error(`Failed to erase memory.\n${ex}`);
            return;
        }
    }
    
    async authenticate() {
        try {
            console.log('Authenticating client..');
            
            await this.page.type('#email', this.email,    {delay: 10});
            await this.page.type('#pass' , this.password, {delay: 10});
            await this.page.keyboard.press('Enter');

            // This will break the app if your internet isn't fast enough
            // In such case, use this instead:
            //
            //     await this.page.waitForNavigation();
            //
            // in trade, you need to wait the entire page to load

            await this.page.waitFor(3000);
        } catch (ex) {
            console.error('Cannot authenticate client');
            throw ex;
        }
    }
    
    async scan(year) {
        console.log('Scanning memories..');

        await this.page.goto(`https://www.facebook.com/${this.profileid}/allactivity?key=year_${year}`, {timeout: 0});
        const cancel = await this.page.$('.layerCancel');
        if (cancel) { 
            cancel.click();
            await this.page.waitFor(500);
        }
    
        await this.scroll();
        return await this.page.$$('.uiBoxWhite._5shk');
    }
    
    async erase(memories) {
        const filters = [
            'became friends',
            'is with',
            'tagged',
            'mentioned',
            'Cintya Mutz', // Holy post in O2RPG group :v :v :v :v :v :v
            'Yana' // :v :v :v
        ];
    
        for(const memory of memories) {
            const content = await memory.$eval('._42ef > div', wrapper => wrapper.innerText);
            if (filters.some(filter => content.indexOf(filter) != -1)) {
                continue;
            }

            // This will print your shameless act into the console
            // And will remind you how shameless you're in the past
            console.log(content);
            const story = await memory.$eval('._51m-.vTop._5ep6', story => story.innerText);
            if (story) {
                console.log(`${story}\n`);
            }

            try {
                // All of these "waitFor" delays are based on my guess
                // It's slow, but work perfectly fine on my end
                const memoryId = await memory.$eval('.uiPopover > ._42gx', element => element.id);
                await memory.$eval(`#${memoryId}`, popover => popover.click());
                await this.page.waitFor(750);
        
                const eraser = await this.page.$(`.uiContextualLayerPositioner.uiLayer:not(.hidden_elem)`);
                await eraser.$eval('ul > li:last-child > a', cell => cell.click());
                await this.page.waitFor(750);

                const confirm = await this.page.$('.layerConfirm');
                if (confirm) {
                    confirm.click();
                    await this.page.waitFor(1250);
                }

                // This one for "content no longer available" or some shit
                // It'll also close the delete confirmation dialog once confirmation button is clicked, so the dialog won't overlap each other
                const cancel = await this.page.$('.layerCancel');
                if (cancel) { 
                    cancel.click();
                    await this.page.waitFor(1250);
                }
            } catch (ex) {
                console.error(ex);
            }
        }

        await this.browser.close();
    }
    
    async scroll(delay = 1000) {
        let previousHeight;
    
        try {
            while (true) {
                previousHeight = await this.page.evaluate('document.body.scrollHeight');
                await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
                await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`, { timeout: 3000 });
                await this.page.waitFor(delay);
            }
        } catch (ex) {
            // Kind of hack, but when the scroll finished, "waitForFunction" will throw an exception cuz nothing to scroll
        }
    }
    
    sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }
}

module.exports = MemoryEraserDevice;