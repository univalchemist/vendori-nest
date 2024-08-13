interface SVGProps {
  color?: string;
  isColored?: boolean;
}

export default ({ color, isColored = false }: SVGProps) => ({
  overview: `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z" fill="${
        isColored ? color : '#000'
      }"/>
      <path d="M15.5812 16H8.50626C8.09309 16 7.87415 15.5411 8.15916 15.242C9.00598 14.3533 10.5593 13 12.1667 13C13.7899 13 15.2046 14.3801 15.947 15.2681C16.2011 15.5721 15.9774 16 15.5812 16Z" fill="${
        isColored ? color : '#000'
      }" stroke="${
    isColored ? color : '#000'
  }" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="10" stroke="${
        isColored ? color : '#000'
      }" stroke-width="2"/>
      </svg>
  `,
  details: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" id="id_101" style="stroke: ${
    isColored ? color : '#000'
  };"></path><polyline points="14 2 14 8 20 8" id="id_102" style="stroke: ${
    isColored ? color : '#000'
  };"></polyline><line x1="16" y1="13" x2="8" y2="13" id="id_103" style="stroke: ${
    isColored ? color : '#000'
  };"></line><line x1="16" y1="17" x2="8" y2="17" id="id_104" style="stroke: ${
    isColored ? color : '#000'
  };"></line><polyline points="10 9 9 9 8 9" id="id_105" style="stroke: ${
    isColored ? color : '#000'
  };"></polyline></svg>`,
  schedule: `<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:${
    isColored ? color : '#000'
  };stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>68.calendar</title><g id="_68.calendar" data-name="68.calendar"><rect class="cls-1" x="1" y="3" width="22" height="20" rx="3" ry="3"/><line class="cls-1" x1="1" y1="9" x2="23" y2="9"/><line class="cls-1" x1="12" y1="5" x2="12" y2="1"/><line class="cls-1" x1="6" y1="5" x2="6" y2="1"/><line class="cls-1" x1="18" y1="5" x2="18" y2="1"/><line class="cls-1" x1="5" y1="14" x2="7" y2="14"/><line class="cls-1" x1="11" y1="14" x2="13" y2="14"/><line class="cls-1" x1="17" y1="14" x2="19" y2="14"/><line class="cls-1" x1="5" y1="18" x2="7" y2="18"/><line class="cls-1" x1="11" y1="18" x2="13" y2="18"/><line class="cls-1" x1="17" y1="18" x2="19" y2="18"/></g></svg>`,
  breakdown: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><style>.cls-1{fill:${
    isColored ? color : '#000'
  };}.cls-2{fill:${
    isColored ? color : '#000'
  };}</style></defs><title>b</title><path class="cls-1" d="M125.53932,7.36692,98.33991,9.70459a.71481.71481,0,0,0-.42923,1.2322l6.86128,6.47108-1.523,1.55452-1.01628,1.03715-5.15883,5.35552q-2.98173,3.1427-5.93965,6.30028-2.119,2.271-4.21409,4.56874-5.01576,5.48962-9.9034,11.10443c-1.62126,1.87758-3.23656,3.76407-4.828,5.67146-.42318.50664-.84043,1.01924-1.26064,1.52887l-1.70173-.95668L42.67516,38.647l-4.23795-2.38125-3.03687,3.3081L31.6005,43.71347,1.68465,76.29962,7.967,82.427l32.3686-31.23611h.003L59.28711,63.51728l9.68883,6.30326,3.51372,2.28585.80467.52154L77.866,68.62247q2.80744-2.46319,5.52838-5.00683c1.821-1.69279,3.61506-3.40644,5.40322-5.12606q5.35555-5.17223,10.55311-10.48753c3.48094-3.53161,6.89632-7.1258,10.30276-10.726l5.06943-5.442.68545-.748,1.79243-1.95615,6.55115,6.1786a.71481.71481,0,0,0,1.20433-.48371l1.35809-26.70946A.71479.71479,0,0,0,125.53932,7.36692Z" id="id_101" style="fill: ${
    isColored ? color : '#000'
  };"></path><path class="cls-2" d="M8.10347,118.29751a2.34167,2.34167,0,0,0,2.33824,2.33825H26.65a2.34169,2.34169,0,0,0,2.33825-2.33825V71.00394L8.10347,91.158Z" id="id_102" style="fill: ${
    isColored ? color : '#000'
  };"></path><path class="cls-2" d="M37.06576,63.208v55.08947a2.34167,2.34167,0,0,0,2.33824,2.33825H55.61226a2.34169,2.34169,0,0,0,2.33824-2.33825V70.25464l-16.838-10.95252Z" id="id_103" style="fill: ${
    isColored ? color : '#000'
  };"></path><path class="cls-2" d="M73.87179,80.60135l-7.84374-5.09364v42.7898a2.34167,2.34167,0,0,0,2.33824,2.33825H84.57455a2.34169,2.34169,0,0,0,2.33824-2.33825V69.05364c-1.55705,1.4428-3.18585,2.90952-4.84121,4.36294Z" id="id_104" style="fill: ${
    isColored ? color : '#000'
  };"></path><path class="cls-2" d="M103.8916,52.47871c-3.20977,3.26822-6.14319,6.19368-8.90125,8.88531v56.93349a2.34167,2.34167,0,0,0,2.33824,2.33825h16.20825a2.34169,2.34169,0,0,0,2.33824-2.33825V39.95318L114.28614,41.659C110.994,45.13716,107.48133,48.83849,103.8916,52.47871Z" id="id_105" style="fill: ${
    isColored ? color : '#000'
  }"></path></svg>`,
  comments: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:url(#SVGID_1_);}
      .st1{fill:url(#SVGID_2_);}
      .st2{fill:url(#SVGID_3_);}
      .st3{fill:url(#SVGID_4_);}
      .st4{fill:url(#SVGID_5_);}
      .st5{fill:url(#SVGID_6_);}
      .st6{fill:url(#SVGID_7_);}
      .st7{fill:url(#SVGID_8_);}
      .st8{fill:url(#SVGID_9_);}
      .st9{fill:url(#SVGID_10_);}
      .st10{fill:url(#SVGID_11_);}
      .st11{fill:url(#SVGID_12_);}
      .st12{fill:url(#SVGID_13_);}
      .st13{fill:url(#SVGID_14_);}
      .st14{fill:url(#SVGID_15_);}
      .st15{fill:url(#SVGID_16_);}
      .st16{fill:url(#SVGID_17_);}
      .st17{fill:url(#SVGID_18_);}
      .st18{fill:url(#SVGID_19_);}
      .st19{fill:url(#SVGID_20_);}
      .st20{fill:url(#SVGID_21_);}
      .st21{fill:url(#SVGID_22_);}
      .st22{fill:url(#SVGID_23_);}
      .st23{fill:url(#SVGID_24_);}
      .st24{fill:url(#SVGID_25_);}
      .st25{fill:url(#SVGID_26_);}
      .st26{fill:url(#SVGID_27_);}
      .st27{fill:url(#SVGID_28_);}
      .st28{fill:url(#SVGID_29_);}
      .st29{fill:url(#SVGID_30_);}
      .st30{fill:url(#SVGID_31_);}
      .st31{fill:url(#SVGID_32_);}
      .st32{fill:url(#SVGID_33_);}
      .st33{fill:url(#SVGID_34_);}
      .st34{fill:url(#SVGID_35_);}
      .st35{fill:url(#SVGID_36_);}
      .st36{fill:url(#SVGID_37_);}
      .st37{fill:url(#SVGID_38_);}
      .st38{fill:url(#SVGID_39_);}
      .st39{fill:url(#SVGID_40_);}
      .st40{fill:url(#SVGID_41_);}
      .st41{fill:url(#SVGID_42_);}
      .st42{fill:url(#SVGID_43_);}
      .st43{fill:url(#SVGID_44_);}
      .st44{fill:url(#SVGID_45_);}
      .st45{fill:url(#SVGID_46_);}
      .st46{fill:url(#SVGID_47_);}
      .st47{fill:url(#SVGID_48_);}
      .st48{fill:url(#SVGID_49_);}
      .st49{fill:url(#SVGID_50_);}
      .st50{fill:url(#SVGID_51_);}
      .st51{fill:url(#SVGID_52_);}
      .st52{fill:url(#SVGID_53_);}
      .st53{fill:url(#SVGID_54_);}
      .st54{fill:url(#SVGID_55_);}
      .st55{fill:url(#SVGID_56_);}
      .st56{fill:url(#SVGID_57_);}
      .st57{fill:url(#SVGID_58_);}
      .st58{fill:url(#SVGID_59_);}
      .st59{fill:url(#SVGID_60_);}
      .st60{fill:url(#SVGID_61_);}
      .st61{fill:url(#SVGID_62_);}
      .st62{fill:url(#SVGID_63_);}
      .st63{fill:url(#SVGID_64_);}
      .st64{fill:url(#SVGID_65_);}
      .st65{fill:url(#SVGID_66_);}
      .st66{fill:url(#SVGID_67_);}
      .st67{fill:url(#SVGID_68_);}
      .st68{fill:url(#SVGID_69_);}
      .st69{fill:url(#SVGID_70_);}
      .st70{fill:url(#SVGID_71_);}
      .st71{fill:url(#SVGID_72_);}
      .st72{fill:url(#SVGID_73_);}
      .st73{fill:url(#SVGID_74_);}
      .st74{fill:url(#SVGID_75_);}
      .st75{fill:url(#SVGID_76_);}
      .st76{fill:url(#SVGID_77_);}
      .st77{fill:url(#SVGID_78_);}
      .st78{fill:url(#SVGID_79_);}
      .st79{fill:url(#SVGID_80_);}
      .st80{fill:url(#SVGID_81_);}
      .st81{fill:url(#SVGID_82_);}
      .st82{fill:url(#SVGID_83_);}
      .st83{fill:url(#SVGID_84_);}
      .st84{fill:url(#SVGID_85_);}
      .st85{fill:url(#SVGID_86_);}
      .st86{fill:url(#SVGID_87_);}
      .st87{fill:url(#SVGID_88_);}
      .st88{fill:url(#SVGID_89_);}
      .st89{fill:url(#SVGID_90_);}
      .st90{fill:url(#SVGID_91_);}
      .st91{fill:url(#SVGID_92_);}
      .st92{fill:url(#SVGID_93_);}
      .st93{fill:url(#SVGID_94_);}
      .st94{fill:url(#SVGID_95_);}
      .st95{fill:url(#SVGID_96_);}
      .st96{fill:url(#SVGID_97_);}
      .st97{fill:url(#SVGID_98_);}
      .st98{fill:url(#SVGID_99_);}
      .st99{fill:url(#SVGID_100_);}
      .st100{fill:url(#SVGID_101_);}
      .st101{fill:url(#SVGID_102_);}
      .st102{fill:url(#SVGID_103_);}
      .st103{fill:url(#SVGID_104_);}
      .st104{fill:url(#SVGID_105_);}
      .st105{fill:url(#SVGID_106_);}
    </style>
    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0.8003" y1="12" x2="23.1997" y2="12">
    <stop offset="0" style="stop-color: ${
      isColored ? color : '#000'
    };" id="id_102"></stop>
    <stop offset="1" style="stop-color: ${
      isColored ? color : '#000'
    };" id="id_103"></stop>
    </linearGradient>
    <path class="st0" d="M14,15.1c1.4-0.6,2.4-1.3,3.2-2.3c0.8-1,1.2-2.1,1.2-3.2c0-1.2-0.4-2.2-1.2-3.2c-0.8-1-1.9-1.8-3.2-2.3
      c-1.4-0.6-2.8-0.9-4.4-0.9C8,3.2,6.5,3.5,5.2,4.1C3.8,4.6,2.8,5.4,2,6.4c-0.8,1-1.2,2.1-1.2,3.2c0,1,0.3,1.9,0.9,2.8
      c0.6,0.9,1.4,1.6,2.4,2.2C4,14.8,4,15,3.9,15.2c-0.1,0.2-0.2,0.3-0.3,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-0.1,0.1-0.2,0.2-0.3,0.4
      c-0.2,0.2-0.2,0.3-0.3,0.3c0,0,0,0-0.1,0.1c0,0-0.1,0.1-0.1,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1l0,0.1c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1
      c0,0,0,0.1,0,0.1c0,0.1,0.1,0.2,0.1,0.3c0.1,0.1,0.2,0.1,0.3,0.1h0c0.4-0.1,0.8-0.1,1.1-0.2c1.3-0.3,2.4-0.9,3.5-1.6
      C8.2,15.9,8.9,16,9.6,16C11.2,16,12.7,15.7,14,15.1z M7,14.1l-0.6,0.4C6.2,14.6,6,14.8,5.7,15l0.4-1.1l-1.2-0.7
      c-0.8-0.5-1.4-1-1.9-1.6c-0.4-0.6-0.7-1.3-0.7-2c0-0.9,0.3-1.6,1-2.4C4,6.5,4.9,5.9,6,5.4C7.1,5,8.3,4.8,9.6,4.8s2.5,0.2,3.6,0.7
      c1.1,0.4,2,1,2.6,1.8c0.7,0.7,1,1.5,1,2.4c0,0.8-0.3,1.6-1,2.4c-0.7,0.7-1.5,1.3-2.6,1.8c-1.1,0.4-2.3,0.6-3.6,0.6
      c-0.6,0-1.3-0.1-1.9-0.2L7,14.1z M19.9,17.8c0.1,0.2,0.2,0.4,0.3,0.5c0.1,0.2,0.2,0.3,0.3,0.5c0.1,0.2,0.2,0.3,0.3,0.4
      c0.1,0.1,0.2,0.2,0.3,0.4c0.1,0.2,0.2,0.3,0.3,0.3c0,0,0,0,0.1,0.1c0,0,0,0,0.1,0.1c0,0,0,0,0.1,0.1c0,0,0,0.1,0,0.1l0,0.1
      c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1c0,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.1-0.3,0.1c-0.4-0.1-0.8-0.1-1.1-0.2
      c-1.3-0.3-2.4-0.9-3.5-1.6c-0.8,0.1-1.5,0.2-2.2,0.2c-2.3,0-4.2-0.6-5.9-1.6c0.5,0,0.8,0,1.1,0c1.3,0,2.6-0.2,3.9-0.6
      c1.2-0.4,2.3-0.9,3.3-1.6c1-0.8,1.8-1.7,2.4-2.6c0.6-1,0.8-2.1,0.8-3.2c0-0.6-0.1-1.3-0.3-1.9c1.1,0.6,1.9,1.3,2.6,2.2
      c0.6,0.9,0.9,1.8,0.9,2.9c0,1-0.3,1.9-0.9,2.8C21.7,16.5,20.9,17.2,19.9,17.8z" id="id_101"></path>
    </svg>`,
  contacts: `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>phone</title><path d="M22.19,15.3,19.3,12.42a2,2,0,0,0-1.73-.56,2,2,0,0,0-1.42,1l-.62.8a.53.53,0,0,1-.38.2.5.5,0,0,1-.39-.15L10.32,9.24a.54.54,0,0,1-.15-.4.53.53,0,0,1,.2-.37l.8-.62a2,2,0,0,0,1-1.42,2,2,0,0,0-.56-1.74L8.7,1.81a2.85,2.85,0,0,0-3.93,0L1.66,4.93c-.87.86-.88,2.33,0,4.38a12.2,12.2,0,0,0,2.21,3.6l7.26,7.26a12.2,12.2,0,0,0,3.6,2.21,7.17,7.17,0,0,0,2.6.62,2.38,2.38,0,0,0,1.78-.66l3.12-3.11A2.79,2.79,0,0,0,22.19,15.3Zm-1.45,2.48-3.12,3.11c-.59.43-3.88-1-5.08-2.17L5.28,11.46C4.08,10.25,2.68,7,3.11,6.38L6.22,3.26a.74.74,0,0,1,1,0L10.1,6.09l-1,.76a2.62,2.62,0,0,0-1,1.87,2.59,2.59,0,0,0,.75,2l4.44,4.44a2.55,2.55,0,0,0,2,.75,2.62,2.62,0,0,0,1.87-1l.67-.86V14l0-.09,2.89,2.88A.74.74,0,0,1,20.74,17.78Z" id="id_101" style="fill: ${
    isColored ? color : '#000'
  };"></path></svg>`,
});
