Add-Type -AssemblyName System.Drawing

$crops = @(
    @{ file="790476251_122113054899417938_5662713628547669874_n.jpg"; out="sunshine-yellow-muna-jori.jpg"; x=340; y=25; w=660; h=880 },
    @{ file="791648527_122113022721417938_8712576263468059069_n.jpg"; out="crimson-red-georgette.jpg"; x=360; y=85; w=650; h=820 },
    @{ file="792520625_122114154645417938_2262845900248809432_n.jpg"; out="rose-pink-georgette.jpg"; x=440; y=0; w=580; h=780 },
    @{ file="792863888_122113284351417938_1144984186792382822_n.jpg"; out="coral-rose-zafran-blockprint.jpg"; x=430; y=0; w=580; h=780 },
    @{ file="793203750_122113570419417938_1030271338946832518_n.jpg"; out="blush-pink-georgette.jpg"; x=430; y=0; w=580; h=780 },
    @{ file="793222671_122113759149417938_8927346515413895308_n.jpg"; out="emerald-forest-zafran-embroidery.jpg"; x=460; y=40; w=640; h=860 },
    @{ file="796449869_122117423703417938_2404201161141518781_n.jpg"; out="ruby-red-zafran-karchupi.jpg"; x=0; y=40; w=600; h=780 },
    @{ file="796659449_122117703873417938_3954812306350071443_n.jpg"; out="amber-rust-georgette-zari.jpg"; x=35; y=100; w=590; h=800 },
    @{ file="797914095_122113955847417938_3436505967665324430_n.jpg"; out="forest-green-lotus-stone.jpg"; x=500; y=40; w=610; h=850 },
    @{ file="798018707_122115091809417938_1132919255195507075_n.jpg"; out="mocha-brown-stitched-stone.jpg"; x=30; y=85; w=450; h=620 },
    @{ file="799487187_122114359719417938_7780993890436943716_n.jpg"; out="candy-pink-side-crown.jpg"; x=80; y=170; w=520; h=700 },
    @{ file="800642886_122115296217417938_1161114696972497991_n.jpg"; out="ocean-teal-four-petal.jpg"; x=0; y=110; w=550; h=780 },
    @{ file="801581573_122115695487417938_2230315553494698049_n.jpg"; out="cream-peach-kalka-blockpaint.jpg"; x=310; y=320; w=380; h=480 },
    @{ file="802030968_122115751425417938_6203237547873765481_n.jpg"; out="royal-violet-stone-work.jpg"; x=25; y=0; w=640; h=850 },
    @{ file="807284079_122116137831417938_7682188132973942430_n.jpg"; out="blossom-pink-pearl-embroidery.jpg"; x=10; y=0; w=600; h=820 },
    @{ file="813421044_122116441539417938_9146068749978506774_n.jpg"; out="dark-emerald-pearl-scallop.jpg"; x=30; y=20; w=720; h=960 },
    @{ file="814085394_122116793409417938_2982468074286500883_n.jpg"; out="sapphire-floral-fabric-paint.jpg"; x=190; y=0; w=580; h=780 },
    @{ file="814779680_122116863021417938_8217452614570033107_n.jpg"; out="mint-flora-zafran-blockprint.jpg"; x=0; y=85; w=570; h=800 },
    @{ file="818366376_122118452811417938_8350067677185814966_n.jpg"; out="ivory-magenta-mirror-work.jpg"; x=0; y=50; w=540; h=780 },
    @{ file="818384465_122117056557417938_8741573921319891954_n.jpg"; out="cocoa-bronze-star-mirror.jpg"; x=35; y=0; w=580; h=800 },
    @{ file="825267296_122119093767417938_7114475076870301111_n.jpg"; out="royal-teal-floral-tiara.jpg"; x=0; y=100; w=640; h=880 }
)

$srcDir = Join-Path $PSScriptRoot "..\public\images\eternal6"
$outDir = Join-Path $PSScriptRoot "..\public\images\eternal6\crops"

if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

foreach ($item in $crops) {
    $srcPath = Join-Path $srcDir $item.file
    $dstPath = Join-Path $outDir $item.out
    if (Test-Path $srcPath) {
        $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
        $rect = New-Object System.Drawing.Rectangle($item.x, $item.y, $item.w, $item.h)
        $cropBmp = $bmp.Clone($rect, $bmp.PixelFormat)
        $cropBmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $cropBmp.Dispose()
        $bmp.Dispose()
        Write-Output "Created crop: $($item.out)"
    }
}
