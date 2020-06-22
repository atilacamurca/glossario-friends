/**
 * @return {object} window.open() with config
 */
export function openPopUpWindow (share_url, width, height) {
    if (window) {
        let left = Math.round(screen.width / 2 - width / 2);
        let top = Math.round(screen.height / 2 - height / 2);
        const window_config = `width=${width},height=${height},left=${left},top=${top}`;

        return window.open(
            share_url,
            "Compartilhar",
            `${window_config},toolbar=no,menubar=no,scrollbars=no`
        );
    }
}
