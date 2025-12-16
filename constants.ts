import { Config } from './types';

export const CONFIG: Config = {
  "app": {
    "name": "Knoux Win",
    "theme": "dark",
    "scriptsPath": "./scripts/"
  },
  "sections": [
    {
      "id": "deep_cleaning",
      "name": "التنظيف العميق",
      "color": "#4CAF50",
      "scripts": [
        {"name":"تنظيف الملفات المؤقتة","script":"clean_temp.ps1","admin":true,"icon":"trash", "description": "حذف الملفات المؤقتة ومخلفات النظام"},
        {"name":"تنظيف ذاكرة التحديث","script":"clear_winupdate_cache.ps1","admin":true,"icon":"archive", "description": "إصلاح مشاكل التحديث عبر تنظيف الكاش"},
        {"name":"حذف ملفات Prefetch","script":"delete_prefetch_files.ps1","admin":true,"icon":"zap", "description": "تسريع النظام عبر إعادة بناء فهرس التشغيل"},
        {"name":"حذف تقارير الأعطال","script":"delete_crash_dumps.ps1","admin":true,"icon":"alert-circle", "description": "توفير المساحة بحذف تقارير الأخطاء القديمة"},
        {"name":"حذف السجلات القديمة","script":"delete_old_logs.ps1","admin":true,"icon":"file-text", "description": "تنظيف ملفات السجل (Logs) المتراكمة"},
        {"name":"تنظيف كاش الصور","script":"clear_thumbnail_cache.ps1","admin":false,"icon":"image", "description": "إصلاح مشاكل عرض المصغرات في المستكشف"},
        {"name":"تفريغ كاش DNS","script":"flush_dns_cache.ps1","admin":false,"icon":"wifi", "description": "حل مشاكل الاتصال بالإنترنت والمواقع"},
        {"name":"مسح ذاكرة ARP","script":"clear_arp_cache.ps1","admin":false,"icon":"activity", "description": "تحديث جدول عناوين الشبكة المحلية"},
        {"name":"إفراغ سلة المحذوفات","script":"empty_recycle_bin.ps1","admin":false,"icon":"trash-2", "description": "حذف نهائي للملفات الموجودة في السلة"},
        {"name":"حذف مثبتات البرامج","script":"remove_old_installer_files.ps1","admin":true,"icon":"package", "description": "إزالة ملفات التثبيت القديمة غير الضرورية"},
        {"name":"تنظيف مجلد WinSxS","script":"clean_winsxs_safe.ps1","admin":true,"icon":"hard-drive", "description": "تقليل حجم مجلد النظام بأمان (يستغرق وقتاً)"},
        {"name":"حذف سجلات الأحداث","script":"purge_event_logs.ps1","admin":true,"icon":"list", "description": "تصفير عارض الأحداث (Event Viewer)"},
        {"name":"تنظيف المتصفحات","script":"browser_cache_clean.ps1","admin":false,"icon":"chrome", "description": "حذف الكاش لمتصفحات Chrome و Edge"},
        {"name":"تنظيف كورتانا","script":"clear_cortana_files.ps1","admin":false,"icon":"mic-off", "description": "إزالة البيانات المخزنة للمساعد الشخصي"},
        {"name":"حذف تقارير الأخطاء","script":"error_reporting_cleanup.ps1","admin":true,"icon":"alert-triangle", "description": "تنظيف خدمة WerFault وتقاريرها"},
        {"name":"تنظيف OneDrive","script":"onedrive_cache_clear.ps1","admin":false,"icon":"cloud", "description": "حذف الملفات المؤقتة للمزامنة"},
        {"name":"سجلات الحماية","script":"defender_log_clean.ps1","admin":true,"icon":"shield", "description": "تنظيف سجلات فحص Windows Defender"},
        {"name":"تحسين التسليم","script":"delivery_optimization_clear.ps1","admin":true,"icon":"download", "description": "حذف ملفات مشاركة التحديثات"},
        {"name":"حذف ملفات غير مستخدمة","script":"unused_system_files_delete.ps1","admin":true,"icon":"file-minus", "description": "فحص وحذف الملفات المهملة"},
        {"name":"تنظيف تلقائي شامل","script":"auto_deep_clean_all_safe.ps1","admin":true,"icon":"check-circle", "description": "تشغيل كافة أدوات التنظيف الآمنة"}
      ]
    },
    {
      "id": "repair_restore",
      "name": "الاستعادة والإصلاح",
      "color": "#2196F3",
      "scripts": [
        {"name":"فحص ملفات النظام (SFC)","script":"run_sfc.ps1","admin":true,"icon":"shield", "description": "فحص وإصلاح ملفات ويندوز التالفة"},
        {"name":"إصلاح صورة النظام (DISM)","script":"dism_repair.ps1","admin":true,"icon":"tool", "description": "إصلاح مخزن مكونات ويندوز من الإنترنت"},
        {"name":"إصلاح تحديثات ويندوز","script":"update_reinstall.ps1","admin":true,"icon":"refresh-cw", "description": "إعادة بناء مكونات Windows Update"},
        {"name":"إصلاح خدمة التثبيت","script":"installer_repair.ps1","admin":true,"icon":"package-check", "description": "حل مشاكل تثبيت البرامج (MSI)"},
        {"name":"إصلاح محول الشبكة","script":"network_adapter_fix.ps1","admin":true,"icon":"wifi", "description": "إعادة تعيين إعدادات كارت الشبكة"},
        {"name":"تصفير TCP/IP","script":"reset_tcpip.ps1","admin":true,"icon":"server", "description": "إعادة ضبط بروتوكولات الاتصال"},
        {"name":"تصفير Winsock","script":"winsock_reset.ps1","admin":true,"icon":"minimize", "description": "حل مشاكل الاتصال بالشبكة"},
        {"name":"إصلاح متجر ويندوز","script":"store_restore.ps1","admin":true,"icon":"shopping-bag", "description": "إعادة تسجيل تطبيقات المتجر"},
        {"name":"تسجيل مكتبات DLL","script":"register_core_dlls.ps1","admin":true,"icon":"database", "description": "إعادة تسجيل ملفات النظام الأساسية"},
        {"name":"إصلاح الصلاحيات","script":"permission_fix.ps1","admin":true,"icon":"lock", "description": "ضبط صلاحيات ملفات النظام الافتراضية"},
        {"name":"إصلاح الإقلاع","script":"boot_repair.ps1","admin":true,"icon":"power", "description": "إصلاح ملفات BCD والإقلاع"},
        {"name":"إصلاح الريجستري","script":"basic_registry_fix.ps1","admin":true,"icon":"file-code", "description": "إصلاح القيم الأساسية في السجل"},
        {"name":"إعادة تشغيل الخدمات","script":"restart_critical_services.ps1","admin":true,"icon":"play-circle", "description": "تنشيط خدمات النظام المتوقفة"},
        {"name":"ضبط خطط الطاقة","script":"power_plan_reset.ps1","admin":true,"icon":"battery", "description": "استعادة إعدادات الطاقة الافتراضية"},
        {"name":"إصلاح الصوت","script":"sound_troubleshoot.ps1","admin":true,"icon":"volume-2", "description": "إعادة تشغيل خدمات الصوت"},
        {"name":"إصلاح منافذ USB","script":"usb_reset.ps1","admin":true,"icon":"usb", "description": "تنشيط التعرف على الأجهزة المتصلة"},
        {"name":"إصلاح البلوتوث","script":"bluetooth_fix.ps1","admin":true,"icon":"bluetooth", "description": "إعادة تشغيل خدمات الاتصال اللاسلكي"},
        {"name":"إصلاح الطباعة","script":"print_service_restart.ps1","admin":true,"icon":"printer", "description": "تفريغ صف الطباعة وإعادة التشغيل"},
        {"name":"إنشاء نقطة استعادة","script":"create_restore_point.ps1","admin":true,"icon":"save", "description": "حفظ حالة النظام الحالية"},
        {"name":"استعادة النظام (الأخيرة)","script":"full_restore_last_point.ps1","admin":true,"icon":"rotate-ccw", "description": "الرجوع لآخر نقطة استعادة مسجلة"}
      ]
    },
    {
      "id": "system_check",
      "name": "الفحص والتحليل",
      "color": "#00BCD4",
      "scripts": [
        {"name":"تقرير صحة النظام","script":"general_report.ps1","admin":false,"icon":"heart", "description": "عرض ملخص شامل لحالة الجهاز"},
        {"name":"فحص الرامات","script":"check_ram.ps1","admin":false,"icon":"cpu", "description": "التأكد من سلامة الذاكرة العشوائية"},
        {"name":"اختبار ضغط المعالج","script":"cpu_test.ps1","admin":false,"icon":"cpu", "description": "قياس استقرار المعالج تحت الضغط"},
        {"name":"فحص القرص (CHKDSK)","script":"chkdsk_analysis.ps1","admin":true,"icon":"hard-drive", "description": "البحث عن أخطاء نظام الملفات"},
        {"name":"كشف القطاعات التالفة","script":"bad_sector_check.ps1","admin":true,"icon":"disc", "description": "فحص فيزيائي لسطح القرص الصلب"},
        {"name":"مراقبة الحرارة","script":"hardware_temp.ps1","admin":false,"icon":"thermometer", "description": "عرض درجات حرارة القطع الحالية"},
        {"name":"تحليل بدء التشغيل","script":"startup_items.ps1","admin":false,"icon":"power", "description": "عرض البرامج التي تعمل مع النظام"},
        {"name":"كشف الخدمات غير الضرورية","script":"unnecessary_services.ps1","admin":false,"icon":"list", "description": "اقتراح خدمات يمكن إيقافها"},
        {"name":"تدقيق المهام المجدولة","script":"scheduled_tasks.ps1","admin":false,"icon":"calendar", "description": "مراجعة المهام الآلية الخلفية"},
        {"name":"التحقق من التعريفات","script":"drivers_verify.ps1","admin":false,"icon":"truck", "description": "فحص تواقيع وسلامة التعريفات"},
        {"name":"فحص تكامل النظام","script":"os_integrity.ps1","admin":true,"icon":"check-square", "description": "مقارنة ملفات النظام بالنسخة الأصلية"},
        {"name":"تشخيص الشبكة","script":"network_diag.ps1","admin":false,"icon":"wifi", "description": "تحليل سرعة واستقرار الاتصال"},
        {"name":"فحص المنافذ المفتوحة","script":"open_ports_scan.ps1","admin":false,"icon":"unlock", "description": "كشف المنافذ (Ports) النشطة"},
        {"name":"فحص صلاحيات الملفات","script":"file_permissions_check.ps1","admin":false,"icon":"key", "description": "تدقيق الأذونات الأمنية للملفات"},
        {"name":"فحص ملفات مشبوهة","script":"suspicious_file_scanner.ps1","admin":true,"icon":"alert-triangle", "description": "بحث سريع عن ملفات خطرة"},
        {"name":"كشف مشاكل الطاقة","script":"power_issue_detect.ps1","admin":false,"icon":"battery-charging", "description": "تحليل استهلاك البطارية والطاقة"},
        {"name":"تحليل أسباب الجمود","script":"freeze_cause_investigation.ps1","admin":true,"icon":"pause-circle", "description": "مراجعة السجلات لمعرفة سبب التعليق"},
        {"name":"كشف عنق الزجاجة","script":"performance_bottleneck.ps1","admin":false,"icon":"bar-chart", "description": "معرفة القطعة التي تبطئ الجهاز"},
        {"name":"تحليل استهلاك الرام","script":"ram_profiling.ps1","admin":false,"icon":"pie-chart", "description": "معرفة البرامج الأكثر استهلاكاً للذاكرة"},
        {"name":"تصدير تقرير كامل","script":"export_report.ps1","admin":false,"icon":"share", "description": "حفظ كل نتائج الفحص في ملف نصي"}
      ]
    },
    {
      "id": "optimization",
      "name": "التحسين والأداء",
      "color": "#FFEB3B",
      "scripts": [
        {"name":"إدارة بدء التشغيل","script":"manage_startup.ps1","admin":false,"icon":"zap", "description": "تسريع إقلاع النظام"},
        {"name":"تعطيل خدمات غير مستخدمة","script":"disable_unused_services.ps1","admin":true,"icon":"stop-circle", "description": "تخفيف الحمل على المعالج"},
        {"name":"تحسين وقت الإقلاع","script":"boot_time_optimize.ps1","admin":true,"icon":"clock", "description": "تعديل إعدادات البوت لسرعة أكبر"},
        {"name":"تفعيل وضع الأداء","script":"enhance_perf_mode.ps1","admin":false,"icon":"trending-up", "description": "ضبط الطاقة لأقصى أداء"},
        {"name":"تحسين كفاءة الرام","script":"optimize_ram_usage.ps1","admin":false,"icon":"cpu", "description": "تفريغ الذاكرة غير المستخدمة"},
        {"name":"تحسين الوصول للقرص","script":"improve_disk_access.ps1","admin":true,"icon":"hard-drive", "description": "تعديل إعدادات الكاش للقرص"},
        {"name":"إلغاء تجزئة (HDD)","script":"hdd_smart_defrag.ps1","admin":true,"icon":"layers", "description": "ترتيب البيانات على الأقراص القديمة"},
        {"name":"تحسين (SSD Trim)","script":"ssd_trim.ps1","admin":true,"icon":"scissors", "description": "صيانة خلايا أقراص SSD"},
        {"name":"تنظيم مجلدات المستخدم","script":"organize_user_dirs.ps1","admin":false,"icon":"folder", "description": "ترتيب المستندات والصور تلقائياً"},
        {"name":"فرز مجلد التنزيلات","script":"sort_downloads_folder.ps1","admin":false,"icon":"download-cloud", "description": "تجميع الملفات حسب النوع"},
        {"name":"ترتيب سطح المكتب","script":"desktop_tidy_up.ps1","admin":false,"icon":"monitor", "description": "تجميع الأيقونات المبعثرة"},
        {"name":"تنظيف الريجستري الآمن","script":"safe_registry_cleanup.ps1","admin":true,"icon":"file-check", "description": "إزالة المفاتيح من البرامج المحذوفة"},
        {"name":"تعطيل التتبع (Telemetry)","script":"disable_telemetry.ps1","admin":true,"icon":"eye-off", "description": "منع إرسال البيانات لمايكروسوفت"},
        {"name":"إيقاف خدمات التتبع","script":"disable_tracking.ps1","admin":true,"icon":"shield-off", "description": "زيادة الخصوصية والأمان"},
        {"name":"تسريع الشبكة","script":"network_speed_boost.ps1","admin":false,"icon":"activity", "description": "ضبط إعدادات TCP للسرعة"},
        {"name":"ضبط DNS سريع","script":"fastest_dns_setup.ps1","admin":false,"icon":"globe", "description": "التغيير إلى Cloudflare أو Google"},
        {"name":"تفعيل وضع الألعاب","script":"gaming_priority_enable.ps1","admin":false,"icon":"play-circle", "description": "إعطاء الأولوية للألعاب"},
        {"name":"توفير بطارية اللابتوب","script":"laptop_power_save.ps1","admin":false,"icon":"battery", "description": "إعدادات ذكية للحفاظ على الشحن"},
        {"name":"تقييد تطبيقات الخلفية","script":"restrict_bg_apps.ps1","admin":false,"icon":"layers", "description": "منع البرامج من العمل خفية"},
        {"name":"تحسين شامل آمن","script":"comprehensive_optimization.ps1","admin":true,"icon":"star", "description": "تطبيق كافة التحسينات الآمنة"}
      ]
    },
    {
      "id": "advanced_control",
      "name": "التحكم المتقدم",
      "color": "#9C27B0",
      "scripts": [
        {"name":"إيقاف الحماية مؤقتاً","script":"temp_disable_defender.ps1","admin":true,"icon":"shield-off", "description": "تعطيل Windows Defender"},
        {"name":"تفعيل الحماية","script":"reactivate_defender.ps1","admin":true,"icon":"shield", "description": "إعادة تشغيل Windows Defender"},
        {"name":"عرض الخدمات الحرجة","script":"list_critical_services.ps1","admin":false,"icon":"list", "description": "قائمة بخدمات النظام الأساسية"},
        {"name":"قتل العمليات المجمدة","script":"kill_freeze_procs.ps1","admin":true,"icon":"x-circle", "description": "إغلاق البرامج التي لا تستجيب"},
        {"name":"إعادة تشغيل المستكشف","script":"restart_explorer.ps1","admin":false,"icon":"refresh-cw", "description": "Restart Explorer.exe"},
        {"name":"مسح كل الكاشات","script":"all_cache_flush.ps1","admin":true,"icon":"trash-2", "description": "تنظيف شامل لكل أنواع الذاكرة المؤقتة"},
        {"name":"تبديل السمة (Light/Dark)","script":"theme_toggle.ps1","admin":false,"icon":"moon", "description": "تغيير مظهر ويندوز"},
        {"name":"تبديل التحديثات","script":"update_toggle.ps1","admin":true,"icon":"refresh-ccw", "description": "إيقاف/تشغيل Windows Update"},
        {"name":"قفل التحديثات","script":"lock_updates.ps1","admin":true,"icon":"lock", "description": "منع التحديثات حتى إعادة التشغيل"},
        {"name":"تفعيل GodMode","script":"activate_godmode.ps1","admin":true,"icon":"zap", "description": "إنشاء مجلد التحكم الشامل"},
        {"name":"إظهار الملفات المخفية","script":"show_hidden_files.ps1","admin":false,"icon":"eye", "description": "عرض ملفات النظام المخفية"},
        {"name":"أدوات المسؤول","script":"admin_tools_access.ps1","admin":true,"icon":"tool", "description": "اختصارات لأدوات الإدارة"},
        {"name":"تصفير سياسات الجروب","script":"reset_gpolicies.ps1","admin":true,"icon":"rotate-ccw", "description": "Reset Group Policy"},
        {"name":"نسخ احتياطي للريجستري","script":"backup_registry.ps1","admin":true,"icon":"save", "description": "حفظ نسخة كاملة من السجل"},
        {"name":"استعادة الريجستري","script":"restore_registry.ps1","admin":true,"icon":"upload", "description": "استرجاع النسخة الاحتياطية"},
        {"name":"إنشاء لقطة للنظام","script":"system_snapshot_gen.ps1","admin":false,"icon":"file-text", "description": "تقرير عن كل البرامج المثبتة"},
        {"name":"تنظيف الطوارئ","script":"emergency_cleanup.ps1","admin":true,"icon":"alert-octagon", "description": "تنظيف عنيف عند امتلاء القرص"},
        {"name":"روتين الإصلاح الحرج","script":"critical_repair_run.ps1","admin":true,"icon":"life-buoy", "description": "إصلاحات طارئة للنظام"},
        {"name":"إصلاح Knoux الآلي","script":"knoux_auto_fix.ps1","admin":true,"icon":"magic-wand", "description": "السكريبت الذكي للإصلاح التلقائي"}
      ]
    },
    {
      "id": "ready_apps",
      "name": "تطبيقات جاهزة",
      "color": "#7C4DFF",
      "scripts": [
        {"name":"Explorer++","script":"launch_explorerplusplus.bat","admin":false,"icon":"folder", "description": "مدير ملفات خفيف ومحمول"},
        {"name":"Total Commander","script":"launch_totalcommander.bat","admin":false,"icon":"copy", "description": "مدير ملفات متقدم"},
        {"name":"CCleaner","script":"launch_ccleaner.bat","admin":false,"icon":"trash", "description": "تنظيف النظام"},
        {"name":"VLC Media Player","script":"launch_vlc.bat","admin":false,"icon":"play", "description": "مشغل وسائط"},
        {"name":"Firefox","script":"launch_firefox.bat","admin":false,"icon":"globe", "description": "متصفح ويب"},
        {"name":"Google Chrome","script":"launch_chrome.bat","admin":false,"icon":"chrome", "description": "متصفح ويب"},
        {"name":"Adobe Reader","script":"launch_adobe_reader.bat","admin":false,"icon":"file-text", "description": "قارئ ملفات PDF"},
        {"name":"7-Zip","script":"launch_7zip.bat","admin":false,"icon":"archive", "description": "ضغط وفك ضغط الملفات"},
        {"name":"Notepad++","script":"launch_notepad_plusplus.bat","admin":false,"icon":"code", "description": "محرر نصوص متطور"},
        {"name":"VirtualBox","script":"launch_virtualbox.bat","admin":false,"icon":"server", "description": "تشغيل الأنظمة الوهمية"},
        {"name":"VS Code","script":"launch_vscode.bat","admin":false,"icon":"terminal", "description": "محرر أكواد"}
      ]
    }
  ]
};