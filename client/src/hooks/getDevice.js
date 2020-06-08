import getWindowDimensions from './getWindowDimensions';

export default (mobile, tablet) => {
        // the borders for determining the kind of device
    const width = getWindowDimensions().width;
    
    return (

    width <= mobile ? (
        'mobile'
    ) : (
        tablet ? (
            width <= tablet ? (
                'tablet'
            ) : (
                'pc'
            )
        ) : ('pc')
    ))

}